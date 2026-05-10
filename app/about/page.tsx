"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaYoutube, FaEnvelope } from "react-icons/fa";
import { RxGithubLogo, RxTwitterLogo, RxLinkedinLogo } from "react-icons/rx";
import { RiRobot2Line, RiArrowDownSLine } from "react-icons/ri";
import { useState } from "react";

import { SectionWrapper } from "@/hoc/SectionWrapper";
import { slideIn, staggerContainer } from "@/lib/motion";

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/yourprv",
    icon: RxGithubLogo,
    color: "hover:text-white hover:bg-gray-800",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/yourprv-developer-65b70b409/",
    icon: RxLinkedinLogo,
    color: "hover:text-white hover:bg-blue-700",
  },
  {
    name: "Twitter / X",
    url: "https://x.com/your_prv",
    icon: RxTwitterLogo,
    color: "hover:text-white hover:bg-sky-500",
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/profile.php?id=61589605165400",
    icon: FaFacebook,
    color: "hover:text-white hover:bg-blue-600",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@voxprv",
    icon: FaYoutube,
    color: "hover:text-white hover:bg-red-600",
  },
  {
    name: "Email",
    url: "mailto:yourprvdeveloper@proton.me",
    icon: FaEnvelope,
    color: "hover:text-white hover:bg-purple-600",
  },
];

const whyChooseItems = [
  {
    title: "Full Stack Expertise",
    description:
      "From frontend animations to backend architecture, I handle every layer of development with precision and modern best practices.",
  },
  {
    title: "Performance First",
    description:
      "Every project is optimized for speed, SEO, and scalability. I build applications that load fast and rank higher.",
  },
  {
    title: "Clean & Maintainable Code",
    description:
      "I follow strict coding standards, write comprehensive documentation, and ensure your codebase stays healthy as it grows.",
  },
  {
    title: "Client-Centric Approach",
    description:
      "Your vision drives the process. I maintain transparent communication, regular updates, and iterative delivery.",
  },
  {
    title: "Security Conscious",
    description:
      "I implement secure authentication, data validation, CSP headers, and rate limiting to protect your users and business.",
  },
  {
    title: "Modern UI/UX",
    description:
      "Stunning, accessible interfaces using Tailwind CSS, Framer Motion, and 3D elements that leave lasting impressions.",
  },
];

const faqs = [
  {
    question: "What technologies do you specialize in?",
    answer:
      "I specialize in the MERN/PERN stack — React, Next.js, TypeScript, Node.js, Express, MongoDB, PostgreSQL, Prisma, and Docker. I also work with React Native, Tauri, and Go for cross-platform solutions.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "It depends on scope. A landing page can be delivered in 3–5 days, while a full-stack SaaS application typically takes 4–8 weeks. I provide detailed timelines after the discovery call.",
  },
  {
    question: "Do you offer ongoing maintenance?",
    answer:
      "Yes! I offer monthly retainer packages for bug fixes, performance monitoring, feature updates, and security patches.",
  },
  {
    question: "Can you work with existing codebases?",
    answer:
      "Absolutely. I can audit, refactor, and extend existing projects while preserving your business logic and improving architecture.",
  },
  {
    question: "What is your pricing model?",
    answer:
      "I offer both fixed-price projects and hourly contracts. After understanding your requirements, I provide a transparent quote with no hidden costs.",
  },
  {
    question: "How do we get started?",
    answer:
      "Simply fill out the contact form on the homepage or drop me an email at yourprvdeveloper@proton.me. I usually respond within 24 hours.",
  },
  {
    question: "Why is YourPRV using @proton.me domain? Why not @gmail? Is this a scam??",
    answer:
      "No, it's not a scam! YourPRV believes in security and encryption. Proton is a trusted brand based in Switzerland that supports end-to-end encryption in email, making communication more secure and private. Privacy comes first.",
  },
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      variants={slideIn("up", "tween", 0.1, 0.5)}
      className="w-full border border-white/10 rounded-xl bg-white/[0.02] backdrop-blur-sm overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left text-white font-medium"
      >
        <span>{question}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <RiArrowDownSLine className="text-xl text-purple-400" />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: open ? "auto" : 0,
          opacity: open ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="px-6 pb-5 text-gray-400 text-sm leading-relaxed">{answer}</p>
      </motion.div>
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <main className="h-full w-full pt-[65px]">
      {/* Hero Section */}
      <SectionWrapper idName="about-hero">
        <div className="flex flex-col xl:flex-row items-center justify-center gap-10 min-h-[70vh]">
          <motion.div
            variants={staggerContainer(0.2, 0.3)}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-6 text-start max-w-[600px]"
          >
            <motion.p
              variants={slideIn("left", "tween", 0.1, 0.8)}
              className="text-purple-400 font-medium tracking-widest text-sm uppercase"
            >
              About Me
            </motion.p>
            <motion.h1
              variants={slideIn("left", "tween", 0.2, 0.8)}
              className="text-white font-black text-4xl md:text-5xl lg:text-6xl leading-tight"
            >
              Your<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">PRV</span>
            </motion.h1>
            <motion.p
              variants={slideIn("left", "tween", 0.3, 0.8)}
              className="text-gray-400 text-lg leading-relaxed"
            >
              I am a passionate <span className="text-white font-semibold">Full Stack Software Engineer</span> based in Nepal, crafting digital experiences that blend performance with stunning visuals.
            </motion.p>
            <motion.p
              variants={slideIn("left", "tween", 0.4, 0.8)}
              className="text-gray-400 text-lg leading-relaxed"
            >
              With hands-on experience across Website, Mobile, and Software development, I have delivered production-grade systems for businesses ranging from retail POS solutions to AI-integrated hotel platforms.
            </motion.p>
            <motion.p
              variants={slideIn("left", "tween", 0.5, 0.8)}
              className="text-gray-400 text-lg leading-relaxed"
            >
              My journey began with a fascination for problem-solving and has evolved into building scalable, secure, and accessible applications. I believe in writing code that not only works but tells a story.
            </motion.p>
            <motion.div variants={slideIn("left", "tween", 0.6, 0.8)} className="flex gap-4 mt-2">
              <Link
                href="/"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition"
              >
                Back to Home
              </Link>
              <Link
                href="/#contact"
                className="px-6 py-3 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition"
              >
                Contact Me
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={slideIn("right", "tween", 0.3, 0.8)}
            initial="hidden"
            animate="show"
            className="relative w-[340px] h-[340px] md:w-[460px] md:h-[460px]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-cyan-600/30 rounded-full blur-3xl" />
            <Image
              src="/1.png"
              alt="YourPRV"
              fill
              className="object-contain relative z-10 drop-shadow-2xl"
              draggable={false}
              priority
            />
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Social Links */}
      <SectionWrapper idName="socials">
        <motion.div
          variants={staggerContainer(0.1, 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="flex flex-col items-center gap-8"
        >
          <motion.h2
            variants={slideIn("up", "tween", 0.1, 0.6)}
            className="text-white font-black text-3xl md:text-4xl text-center"
          >
            Connect With <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">Me</span>
          </motion.h2>
          <motion.p
            variants={slideIn("up", "tween", 0.2, 0.6)}
            className="text-gray-400 text-center max-w-[500px]"
          >
            Follow my journey, see behind-the-scenes content, and stay updated on my latest projects across all platforms.
          </motion.p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-[700px]">
            {socialLinks.map((social, idx) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={slideIn("up", "tween", 0.1 * idx, 0.5)}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-3 px-5 py-4 rounded-xl border border-white/10 bg-white/[0.03] text-gray-300 transition-all duration-300 ${social.color}`}
              >
                <social.icon className="text-xl" />
                <span className="font-medium text-sm">{social.name}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </SectionWrapper>

      {/* Why Choose Me */}
      <SectionWrapper idName="why-choose">
        <motion.div
          variants={staggerContainer(0.1, 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="flex flex-col items-center gap-8"
        >
          <motion.h2
            variants={slideIn("up", "tween", 0.1, 0.6)}
            className="text-white font-black text-3xl md:text-4xl text-center"
          >
            Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">Choose Me?</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
            {whyChooseItems.map((item, idx) => (
              <motion.div
                key={item.title}
                variants={slideIn("up", "tween", 0.1 * idx, 0.5)}
                whileHover={{ y: -6, boxShadow: "0 10px 40px rgba(168,85,247,0.15)" }}
                className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm transition-all duration-300"
              >
                <h3 className="text-white font-bold text-lg mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </SectionWrapper>

      {/* FAQ */}
      <SectionWrapper idName="faq">
        <motion.div
          variants={staggerContainer(0.1, 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="flex flex-col items-center gap-8 max-w-[800px] mx-auto"
        >
          <motion.h2
            variants={slideIn("up", "tween", 0.1, 0.6)}
            className="text-white font-black text-3xl md:text-4xl text-center"
          >
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">Questions</span>
          </motion.h2>

          <div className="w-full flex flex-col gap-3">
            {faqs.map((faq) => (
              <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </motion.div>
      </SectionWrapper>

      {/* AI Assistant Prompt */}
      <SectionWrapper idName="ai-help">
        <motion.div
          variants={staggerContainer(0.1, 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="flex flex-col items-center gap-6 text-center"
        >
          <motion.div
            variants={slideIn("up", "tween", 0.1, 0.6)}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.3)]"
          >
            <RiRobot2Line className="text-3xl text-white" />
          </motion.div>
          <motion.h2
            variants={slideIn("up", "tween", 0.2, 0.6)}
            className="text-white font-black text-2xl md:text-3xl"
          >
            Still Have Doubts?
          </motion.h2>
          <motion.p
            variants={slideIn("up", "tween", 0.3, 0.6)}
            className="text-gray-400 max-w-[500px]"
          >
            For further doubts please ask our AI assistant — PRV AI is available 24/7 to answer questions about my skills, projects, and availability.
          </motion.p>
          <motion.button
            variants={slideIn("up", "tween", 0.4, 0.6)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const event = new CustomEvent("open-prv-ai");
              window.dispatchEvent(event);
            }}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition flex items-center gap-2"
          >
            <RiRobot2Line className="text-lg" />
            Ask PRV AI
          </motion.button>
        </motion.div>
      </SectionWrapper>
    </main>
  );
}
