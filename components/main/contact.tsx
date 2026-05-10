"use client";

import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useState, useRef, type FormEvent, type ChangeEvent, Suspense } from "react";
import { toast } from "sonner";

import { SectionWrapper } from "@/hoc/SectionWrapper";
import { styles } from "@/lib/styles";
import { slideIn } from "@/lib/motion";

// Dynamic import for heavy 3D component to improve initial load
const EarthCanvas = dynamic(() => import("./EarthCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="animate-pulse w-16 h-16 rounded-full bg-purple-500/20" />
    </div>
  ),
});

export const Contact = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    const { name, email, message } = form;

    type Current = {
      name: boolean;
      email: boolean;
      message: boolean;
    };

    const nameError = document.querySelector("#name-error")!;
    const emailError = document.querySelector("#email-error")!;
    const messageError = document.querySelector("#message-error")!;
    const current: Current = { name: false, email: false, message: false };

    if (name.trim().length < 3) {
      nameError.classList.remove("hidden");
      current["name"] = false;
    } else {
      nameError.classList.add("hidden");
      current["name"] = true;
    }

    const email_regex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email.trim().toLowerCase().match(email_regex)) {
      emailError.classList.remove("hidden");
      current["email"] = false;
    } else {
      emailError.classList.add("hidden");
      current["email"] = true;
    }

    if (message.trim().length < 5) {
      messageError.classList.remove("hidden");
      current["message"] = false;
    } else {
      messageError.classList.add("hidden");
      current["message"] = true;
    }

    return Object.keys(current).every(
      (k) => current[k as keyof typeof current],
    );
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return false;

    setLoading(true);

    const toastId = toast.loading(
      "Sorry! I think backend overtimed and is on sleep. Let me wake him up quick be patient."
    );

    emailjs
      .send(
        process.env.NEXT_PUBLIC_APP_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_APP_TEMPLATE_ID || "",
        {
          from_name: form.name,
          to_name: "YourPRV",
          from_email: form.email.trim().toLowerCase(),
          to_email: process.env.NEXT_PUBLIC_APP_EMAILJS_RECIEVER || "",
          message: form.message,
        },
        process.env.NEXT_PUBLIC_APP_EMAILJS_KEY || "",
      )
      .then(() => toast.success("Thanks for contacting me.", { id: toastId }))
      .catch((error) => {
        console.log("[CONTACT_ERROR]: ", error);
        toast.error("Something went wrong.", { id: toastId });
      })
      .finally(() => {
        setLoading(false);
        setForm({
          name: "",
          email: "",
          message: "",
        });
      });
  };

  return (
    <SectionWrapper idName="contact">
      <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-8 items-center justify-center px-4">
        <div className="w-full xl:w-[550px] flex flex-col">
          <motion.p
            variants={slideIn("left", "tween", 0.1, 1)}
            className="text-white font-black text-4xl md:text-5xl mb-6"
          >
            Get in touch
          </motion.p>
          <motion.div
            variants={slideIn("left", "tween", 0.2, 1)}
            className="bg-[#0d1117]/80 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-2xl shadow-purple-500/10"
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col gap-6"
            >
            <label htmlFor="name" className="flex flex-col group">
              <span className="text-white/90 font-medium mb-4 text-sm tracking-wide group-focus-within:text-purple-400 transition-colors">Your Name*</span>
              <input
                type="text"
                name="name"
                id="name"
                value={form.name}
                onChange={handleChange}
                placeholder="YourPRV"
                title="What's your name?"
                disabled={loading}
                aria-disabled={loading}
                className="bg-[#161b22] py-4 px-6 placeholder:text-gray-500 text-white rounded-xl outline-none border border-white/10 font-medium transition-all duration-300 focus:border-purple-500/50 focus:shadow-[0_0_20px_rgba(168,85,247,0.15)] hover:border-white/20 disabled:bg-[#161b22]/50 disabled:text-white/40"
              />
              <span className="text-red-400 mt-2 hidden text-sm flex items-center gap-1" id="name-error"><span className="text-xs">●</span>
                Invalid Name!
              </span>
            </label>

            <label htmlFor="email" className="flex flex-col group">
              <span className="text-white/90 font-medium mb-4 text-sm tracking-wide group-focus-within:text-purple-400 transition-colors">Your Email*</span>
              <input
                type="email"
                name="email"
                id="email"
                value={form.email}
                onChange={handleChange}
                placeholder="johndoe@email.com"
                title="What's your email?"
                disabled={loading}
                aria-disabled={loading}
                className="bg-[#161b22] py-4 px-6 placeholder:text-gray-500 text-white rounded-xl outline-none border border-white/10 font-medium transition-all duration-300 focus:border-purple-500/50 focus:shadow-[0_0_20px_rgba(168,85,247,0.15)] hover:border-white/20 disabled:bg-[#161b22]/50 disabled:text-white/40"
              />
              <span className="text-red-400 mt-2 hidden text-sm flex items-center gap-1" id="email-error"><span className="text-xs">●</span>
                Invalid E-mail!
              </span>
            </label>

            <label htmlFor="message" className="flex flex-col group">
              <span className="text-white/90 font-medium mb-4 text-sm tracking-wide group-focus-within:text-purple-400 transition-colors">Your Message*</span>
              <textarea
                rows={5}
                name="message"
                id="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Hello there!"
                title="What do you want to say?"
                disabled={loading}
                aria-disabled={loading}
                className="bg-[#161b22] py-4 px-6 placeholder:text-gray-500 text-white rounded-xl outline-none border border-white/10 font-medium transition-all duration-300 focus:border-purple-500/50 focus:shadow-[0_0_20px_rgba(168,85,247,0.15)] hover:border-white/20 disabled:bg-[#161b22]/50 disabled:text-white/40 disabled:resize-none min-h-[120px]"
              />
              <span className="text-red-400 mt-2 hidden text-sm flex items-center gap-1" id="message-error"><span className="text-xs">●</span>
                Invalid Message!
              </span>
            </label>

            <button
              type="submit"
              title={loading ? "Sending..." : "Send"}
              className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 py-3 px-10 outline-none w-fit text-white font-bold rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:-translate-y-0.5 active:translate-y-0 disabled:from-gray-600 disabled:to-gray-700 disabled:text-white/60 disabled:hover:shadow-none disabled:hover:translate-y-0"
              disabled={loading}
              aria-disabled={loading}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </motion.div>
        </div>

        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className="xl:w-[60%] xl:h-[650px] md:h-[500px] h-[350px] xl:ml-[5%]"
        >
          <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="animate-pulse w-16 h-16 rounded-full bg-purple-500/20" />
            </div>
          }>
            <EarthCanvas />
          </Suspense>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};
