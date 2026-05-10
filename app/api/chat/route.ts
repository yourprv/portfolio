import { NextRequest, NextResponse } from "next/server";

const ALLOWED_ORIGINS = [
  "https://yourprvportfolio.vercel.app",
  "http://localhost:3000",
];

function corsHeaders(req: NextRequest): HeadersInit {
  const origin = req.headers.get("origin") || "";
  const allowOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(req) });
}

// Simple in-memory rate limiter (per-instance in serverless)
// NOTE: In production, use Redis/Upstash for distributed rate limiting
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;
const MAX_MESSAGE_LENGTH = 2000;

// IP validation regex for IPv4 and IPv6
const IPV4_REGEX = /^(\d{1,3}\.){3}\d{1,3}$/;
const IPV6_REGEX = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;

function isValidIP(ip: string): boolean {
  if (ip === "unknown" || !ip) return false;
  // Basic validation - reject obviously spoofed IPs
  if (ip.includes("..") || ip.includes(" ")) return false;
  return IPV4_REGEX.test(ip) || IPV6_REGEX.test(ip);
}

function getClientIP(req: NextRequest): string {
  // When behind a trusted proxy (Vercel, Cloudflare), x-forwarded-for is reliable
  // In other environments, verify your proxy configuration
  const forwarded = req.headers.get("x-forwarded-for");
  const realIP = req.headers.get("x-real-ip");

  // Prefer x-real-ip if available (set by some proxies)
  if (realIP) {
    const ip = realIP.split(",")[0].trim();
    if (isValidIP(ip)) return ip;
  }

  if (forwarded) {
    const ip = forwarded.split(",")[0].trim();
    if (isValidIP(ip)) return ip;
  }

  // Fallback to connection remote address if available
  return "unknown";
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1, resetIn: RATE_LIMIT_WINDOW_MS };
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    const resetIn = record.resetTime - now;
    return { allowed: false, remaining: 0, resetIn };
  }

  record.count++;
  return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - record.count, resetIn: record.resetTime - now };
}

function cleanupRateLimitStore(): void {
  const now = Date.now();
  for (const [ip, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(ip);
    }
  }
}

// Input sanitization to prevent prompt injection
function sanitizeInput(input: string): string {
  // Remove null bytes
  let sanitized = input.replace(/\x00/g, "");
  // Limit consecutive newlines
  sanitized = sanitized.replace(/\n{4,}/g, "\n\n\n");
  // Remove control characters except newlines and tabs
  sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
  return sanitized.trim();
}

const SYSTEM_PROMPT = `You are PRV AI, the official digital copilot for YourPRV's developer portfolio. Your goal is to represent YourPRV professionally but with a touch of creative wit.

### KEY INFO TO REMEMBER:
- Name: YourPRV (also known as VoxPRV on YouTube)
- Email: yourprvdeveloper@proton.me
- GitHub: https://github.com/yourprv
- LinkedIn: https://www.linkedin.com/in/yourprv-developer-65b70b409/
- Twitter/X: https://x.com/your_prv
- Facebook: https://www.facebook.com/profile.php?id=61589605165400
- YouTube: https://www.youtube.com/@voxprv
- Portfolio: A full-stack Next.js 14 space-themed portfolio

### ABOUT:
YourPRV is a Full Stack Software Engineer with experience in Website, Mobile, and Software development. The portfolio tagline is "Providing the best project experience." The portfolio emphasizes performance and security.

### SKILLS:
Frontend: HTML, CSS, JavaScript, Tailwind CSS, Material UI, React, Redux, React Query, TypeScript, Next.js 14, Framer Motion
Backend: Node.js, Express.js, MongoDB, Firebase, PostgreSQL, MySQL, Prisma, GraphQL
Fullstack: React Native, Tauri, Docker, Figma
Other: Go

### PROJECTS:
1. Business POS - A professional Point of Sale system for internal use across 4-5 devices. Features inventory management, sales tracking, receipt generation, and real-time analytics. Built for Fashion99 (CEO: Rabin B.C).
2. Hotel Maxx Redesign - A world-class 4-star hotel website with AI integration: AI-powered chatbots, smart room recommendations, dynamic pricing, automated booking confirmations, personalized suggestions. Live at hotel-website-yourprv.vercel.app
3. GPA Calculator - Trusted open-source NEB SEE GPA Calculator for Nepali students. Simple, fast, and reliable. Live at see-gpa-calculator.vercel.app

### TESTIMONIALS:
Rabin B.C (CEO of Fashion99): "Working with YourPRV on our POS system was an absolute game-changer. The system streamlined our entire retail operation. Professional, efficient, and delivered beyond expectations!"

### NAVIGATION SECTIONS:
- About Me (#about-me)
- Skills (#skills)
- Projects (#projects)
- Testimonials (#testimonials)
- Contact section has a contact form with name, email, message fields and an interactive 3D EarthCanvas visualization.

### INSTRUCTIONS:
- Introduce yourself as "PRV AI, the digital copilot for YourPRV."
- Be helpful, professional, and slightly witty.
- Answer questions about YourPRV's skills, projects, experience, and portfolio.
- Guide visitors to relevant sections of the portfolio.
- If asked about hiring or contact, provide the email and social links.
- Keep responses concise but informative.
- If you don't know something specific, be honest but redirect to contacting via email.
- Only mention the privacy/encryption reason for Proton email if explicitly asked "why proton" or "why not gmail" or similar. Otherwise just give the email normally without explanation.`;

export async function POST(req: NextRequest) {
  // Abort controller for timeout handling
  const abortController = new AbortController();
  const timeoutId = setTimeout(() => abortController.abort(), 30000); // 30s timeout

  try {
    const ip = getClientIP(req);
    const rateLimit = checkRateLimit(ip);

    if (!rateLimit.allowed) {
      return new Response(
        `Rate limit exceeded. Try again in ${Math.ceil(rateLimit.resetIn / 1000)} seconds.`,
        {
          status: 429,
          headers: {
            ...corsHeaders(req),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": String(rateLimit.resetIn),
          },
        }
      );
    }
    cleanupRateLimitStore();

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return new Response("Invalid JSON body", { status: 400 });
    }

    if (
      typeof body !== "object" ||
      body === null ||
      !("message" in body) ||
      typeof (body as Record<string, unknown>).message !== "string"
    ) {
      return new Response("Invalid request body", { status: 400 });
    }

    let message = (body as Record<string, string>).message;

    // Sanitize input to prevent prompt injection
    message = sanitizeInput(message);

    if (!message || message.length > MAX_MESSAGE_LENGTH) {
      return new Response(
        `Message must be 1-${MAX_MESSAGE_LENGTH} characters`,
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const model = process.env.GEMINI_MODEL || "gemini-1.5-flash-latest";

    if (!apiKey) {
      return new Response("API key not configured", { status: 500 });
    }

    // Validate model name to prevent injection
    const validModelRegex = /^[a-zA-Z0-9-._]+$/;
    if (!validModelRegex.test(model)) {
      return new Response("Invalid model configuration", { status: 500 });
    }

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse&key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
          contents: [{ role: "user", parts: [{ text: message }] }],
        }),
        signal: abortController.signal,
      }
    );

    clearTimeout(timeoutId);

    if (!geminiRes.ok) {
      const errorData = await geminiRes.json().catch(() => ({}));
      const msg = errorData.error?.message || "Failed to get response from AI";
      return new Response(msg, { status: geminiRes.status });
    }

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        const reader = geminiRes.body!.getReader();
        let buffer = "";
        let isClosed = false;

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done || isClosed) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed.startsWith("data: ")) continue;

              const data = trimmed.slice(6);
              if (data === "[DONE]") {
                isClosed = true;
                break;
              }

              try {
                const parsed = JSON.parse(data);
                // Safety check: ensure text exists and is a string
                const chunk =
                  typeof parsed.candidates?.[0]?.content?.parts?.[0]?.text === "string"
                    ? parsed.candidates[0].content.parts[0].text
                    : "";
                if (chunk) {
                  controller.enqueue(encoder.encode(chunk));
                }
              } catch {
                // skip malformed JSON
              }
            }
          }

          // flush remaining buffer
          if (!isClosed && buffer.trim().startsWith("data: ")) {
            const data = buffer.trim().slice(6);
            if (data !== "[DONE]") {
              try {
                const parsed = JSON.parse(data);
                const chunk =
                  typeof parsed.candidates?.[0]?.content?.parts?.[0]?.text === "string"
                    ? parsed.candidates[0].content.parts[0].text
                    : "";
                if (chunk) controller.enqueue(encoder.encode(chunk));
              } catch {
                // ignore
              }
            }
          }
        } catch (err) {
          // Abort errors are expected on timeout
          if (err instanceof Error && err.name !== "AbortError") {
            console.error("Stream error:", err);
          }
        } finally {
          try {
            controller.close();
          } catch {
            // Already closed
          }
        }
      },
    });

    return new Response(stream, {
      headers: {
        ...corsHeaders(req),
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "X-RateLimit-Remaining": String(rateLimit.remaining),
      },
    });
  } catch (err) {
    clearTimeout(timeoutId);

    // Don't log abort errors (expected on timeout)
    if (err instanceof Error && err.name !== "AbortError") {
      console.error("Chat API error:", err);
    }

    return new Response("Internal server error", { status: 500, headers: corsHeaders(req) });
  }
}
