"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  memo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoSend, IoClose } from "react-icons/io5";
import { RiRobot2Line } from "react-icons/ri";

// Throttle utility for performance
function throttle<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  };
}

interface Message {
  role: "user" | "model";
  text: string;
}

const MAX_MESSAGE_LENGTH = 2000;
const WAKE_UP_TEXT = "Please wait patiently! I think backend was in sleep i am waking it up.";

// Allowed URL protocols to prevent javascript: XSS
const ALLOWED_PROTOCOLS = ["http:", "https:", "mailto:"];

function sanitizeUrl(url: string): string {
  try {
    const parsed = new URL(url, "http://localhost");
    if (!ALLOWED_PROTOCOLS.includes(parsed.protocol)) {
      return "#";
    }
    return url;
  } catch {
    // Relative URLs allowed
    if (url.startsWith("/") || url.startsWith("#")) {
      return url;
    }
    return "#";
  }
}

function escapeHtml(text: string): string {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function mdToHtml(text: string): string {
  if (!text) return "";

  let html = text;

  // Store existing HTML tags temporarily to protect from escaping
  const htmlTags: string[] = [];
  html = html.replace(/<[^>]+>/g, (match) => {
    const placeholder = `__HTML_TAG_${htmlTags.length}__`;
    htmlTags.push(match);
    return placeholder;
  });

  // Store code blocks temporarily to protect from other replacements
  const codeBlocks: string[] = [];
  html = html.replace(/```([\s\S]*?)```/g, (_match, code) => {
    const placeholder = `__CODE_BLOCK_${codeBlocks.length}__`;
    codeBlocks.push(
      `<pre class="bg-black/40 rounded-md p-2 my-1 overflow-x-auto text-[11px] font-mono text-purple-300 border border-white/10"><code>${escapeHtml(code)}</code></pre>`
    );
    return placeholder;
  });

  // Store inline code
  const inlineCodes: string[] = [];
  html = html.replace(/`([^`]+)`/g, (_match, code) => {
    const placeholder = `__INLINE_CODE_${inlineCodes.length}__`;
    inlineCodes.push(
      `<code class="bg-black/40 rounded px-1 py-0.5 text-[11px] font-mono text-purple-300">${escapeHtml(code)}</code>`
    );
    return placeholder;
  });

  // bold
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  // italic
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  html = html.replace(/_(.+?)_/g, "<em>$1</em>");

  // links [text](url) - with URL sanitization
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, linkText, url) => {
    const safeUrl = sanitizeUrl(url);
    const isExternal = safeUrl.startsWith("http");
    const target = isExternal ? ' target="_blank" rel="noopener noreferrer"' : "";
    return `<a href="${safeUrl}"${target} class="text-purple-400 underline hover:text-purple-300">${escapeHtml(linkText)}</a>`;
  });

  // unordered lists (process line by line for proper nesting)
  const lines = html.split("\n");
  let inList = false;
  let listHtml = "";
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const listMatch = line.match(/^(\s*)[-*]\s+(.+)$/);
    if (listMatch) {
      if (!inList) {
        listHtml += "<ul class='list-disc ml-4 my-2'>";
        inList = true;
      }
      listHtml += `<li>${listMatch[2]}</li>`;
    } else {
      if (inList) {
        listHtml += "</ul>";
        inList = false;
      }
      listHtml += line;
      if (i < lines.length - 1) listHtml += "<br/>";
    }
  }
  if (inList) listHtml += "</ul>";
  html = listHtml;

  // Restore inline code
  inlineCodes.forEach((code, i) => {
    html = html.replace(`__INLINE_CODE_${i}__`, code);
  });

  // Restore code blocks
  codeBlocks.forEach((block, i) => {
    html = html.replace(`__CODE_BLOCK_${i}__`, block);
  });

  // Restore HTML tags
  htmlTags.forEach((tag, i) => {
    html = html.replace(`__HTML_TAG_${i}__`, tag);
  });

  // Wrap in paragraph if not already wrapped by list or block
  if (!html.includes("<ul") && !html.includes("<pre") && !html.includes("<strong") && !html.includes("<a ")) {
    html = `<p class="my-0">${html}</p>`;
  }

  return html;
}

export const PrvAi = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "Hi! I'm PRV AI, the digital copilot for YourPRV. How can I help you today?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const wakeUpTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasShownWakeUp = useRef(false);

  // Throttled scroll to bottom
  const scrollToBottom = useCallback(
    throttle(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 100),
    []
  );

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-prv-ai", handleOpen);
    return () => {
      window.removeEventListener("open-prv-ai", handleOpen);
      // Abort any pending requests on unmount
      if (abortRef.current) {
        abortRef.current.abort();
      }
      if (wakeUpTimeoutRef.current) {
        clearTimeout(wakeUpTimeoutRef.current);
      }
    };
  }, []);

  // Ping backend on mount to wake up Render free tier service
  useEffect(() => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (backendUrl) {
      fetch(`${backendUrl}/ping`, { method: "GET", mode: "no-cors" }).catch(() => {
        // Silently ignore ping errors
      });
    }
  }, []);

  const handleSend = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    if (userMessage.length > MAX_MESSAGE_LENGTH) {
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: `Message is too long. Max ${MAX_MESSAGE_LENGTH} characters.`,
        },
      ]);
      return;
    }

    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    wakeUpTimeoutRef.current = setTimeout(() => {
      if (!hasShownWakeUp.current) {
        setMessages((prev) => [...prev, { role: "model", text: WAKE_UP_TEXT }]);
        hasShownWakeUp.current = true;
      }
    }, 2500);

    // Create abort controller for this request
    abortRef.current = new AbortController();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
        signal: abortRef.current.signal,
      });

      if (wakeUpTimeoutRef.current) {
        clearTimeout(wakeUpTimeoutRef.current);
        wakeUpTimeoutRef.current = null;
      }

      if (!res.ok) {
        const errorText = await res.text();
        setMessages((prev) => {
          const filtered = prev.filter(
            (m) => !(m.role === "model" && m.text === WAKE_UP_TEXT)
          );
          return [
            ...filtered,
            { role: "model", text: `Error: ${errorText}` },
          ];
        });
        setIsLoading(false);
        return;
      }

      // Add empty model message that the stream will fill live
      setMessages((prev) => {
        const filtered = prev.filter(
          (m) => !(m.role === "model" && m.text === WAKE_UP_TEXT)
        );
        return [...filtered, { role: "model", text: "" }];
      });

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        if (!chunk) continue;

        setMessages((prev) => {
          // Mutate last message efficiently
          const lastIdx = prev.length - 1;
          if (lastIdx >= 0 && prev[lastIdx].role === "model") {
            const newMessages = prev.slice(0, -1);
            return [
              ...newMessages,
              { ...prev[lastIdx], text: prev[lastIdx].text + chunk },
            ];
          }
          return prev;
        });
      }
    } catch (err) {
      if (wakeUpTimeoutRef.current) {
        clearTimeout(wakeUpTimeoutRef.current);
        wakeUpTimeoutRef.current = null;
      }
      // Ignore abort errors
      if (err instanceof Error && err.name === "AbortError") return;

      setMessages((prev) => {
        const filtered = prev.filter(
          (m) => !(m.role === "model" && m.text === WAKE_UP_TEXT)
        );
        return [
          ...filtered,
          { role: "model", text: "Something went wrong. Please try again." },
        ];
      });
    } finally {
      if (wakeUpTimeoutRef.current) {
        clearTimeout(wakeUpTimeoutRef.current);
        wakeUpTimeoutRef.current = null;
      }
      setIsLoading(false);
      abortRef.current = null;
    }
  }, [input, isLoading]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") handleSend();
    },
    [handleSend]
  );

  // Memoized input change handler
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
    },
    []
  );

  // Memoize toggle function
  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Memoize close function
  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Memoized message item to prevent unnecessary re-renders
  const MessageItem = memo(({ msg }: { msg: Message }) => (
    <div
      className={`flex ${
        msg.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
          msg.role === "user"
            ? "bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-br-md"
            : "bg-white/5 text-gray-200 border border-white/10 rounded-bl-md"
        }`}
        style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}
        {...(msg.role === "model"
          ? {
              dangerouslySetInnerHTML: {
                __html: mdToHtml(msg.text),
              },
            }
          : {})}
      >
        {msg.role === "user" ? msg.text : null}
      </div>
    </div>
  ));

  MessageItem.displayName = "MessageItem";

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        onClick={toggleOpen}
        className="fixed bottom-6 right-6 z-[100] flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-5 py-3 text-white shadow-lg shadow-purple-900/40 backdrop-blur-sm border border-white/10"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <RiRobot2Line className="text-xl" />
        <span className="text-sm font-semibold tracking-wide">PRV AI</span>
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 z-[100] flex h-[480px] w-[360px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b1c]/95 shadow-2xl shadow-purple-900/30 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-purple-900/50 to-blue-900/50 px-4 py-3">
              <div className="flex items-center gap-2">
                <RiRobot2Line className="text-xl text-purple-400" />
                <div>
                  <h3 className="text-sm font-bold text-white">PRV AI</h3>
                  <p className="text-[10px] text-gray-400">
                    powered by PRV V1
                  </p>
                </div>
              </div>
              <button
                onClick={closeChat}
                className="rounded-full p-1 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <IoClose className="text-lg" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
              style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(168,85,247,0.3) transparent" }}
            >
              {messages.map((msg, idx) => (
                <MessageItem key={idx} msg={msg} />
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1.5 rounded-2xl bg-white/5 border border-white/10 px-4 py-3 rounded-bl-md">
                    <span
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-purple-400"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-purple-400"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-purple-400"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-white/10 bg-white/5 px-3 py-3">
              <div className="flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-2">
                <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 outline-none"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600 p-2 text-white transition-opacity disabled:opacity-40"
                >
                  <IoSend className="text-sm" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
