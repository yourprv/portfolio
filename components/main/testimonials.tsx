"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TESTIMONIALS } from "@/constants";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
      duration: 0.8,
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="flex flex-col items-center justify-center py-20 px-4"
    >
      <motion.div
        variants={titleVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative mb-16"
      >
        <h1 className="text-[40px] md:text-[56px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-[length:200%_auto] drop-shadow-[0_0_30px_rgba(168,85,247,0.5)] text-center">
          User Testimonials
        </h1>
        <motion.div
          className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl blur-2xl -z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="w-full max-w-4xl"
      >
        {TESTIMONIALS.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            variants={cardVariants}
            className="relative group"
          >
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 to-cyan-600/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Card */}
            <div className="relative bg-[#0d1117]/80 backdrop-blur-xl p-8 md:p-10 rounded-2xl border border-white/10 overflow-hidden">
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-6xl text-purple-500/20 font-serif">
                &ldquo;
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                {/* Avatar */}
                <motion.div
                  className="relative flex-shrink-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Status Indicator */}
                  <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-[#0d1117]" />
                </motion.div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-6 italic">
                    &ldquo;{testimonial.testimonial}&rdquo;
                  </p>

                  <div className="flex flex-col md:flex-row items-center md:items-center gap-2 md:gap-4">
                    <h3 className="text-xl font-bold text-white">
                      {testimonial.name}
                    </h3>
                    <span className="hidden md:block text-purple-500">•</span>
                    <span className="text-purple-400 font-medium">
                      {testimonial.role}
                    </span>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center justify-center md:justify-start gap-1 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <motion.svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-yellow-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.3 }}
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </motion.svg>
                    ))}
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
