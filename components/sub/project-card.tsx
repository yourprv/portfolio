"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type ProjectCardProps = {
  src: string;
  title: string;
  description: string;
  sourceCode?: string;
  website?: string;
  index: number;
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    rotateX: 15,
  },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
      duration: 0.8,
    },
  },
};

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export const ProjectCard = ({
  src,
  title,
  description,
  sourceCode,
  website,
  index,
}: ProjectCardProps) => {
  return (
    <motion.div variants={cardVariants} className="flex-1">
      <div className="group relative overflow-hidden rounded-xl border border-[#2A0E61]/50 bg-[#0d1117]/50">
        {/* Glow Effect */}
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10"
        />

        {/* Image Container */}
        <div className="relative overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <Image
              src={src}
              alt={title}
              width={1000}
              height={1000}
              className="w-full object-contain"
            />
          </motion.div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent opacity-60" />
        </div>

        {/* Content */}
        <div className="relative p-6">
          <motion.h1
            className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300"
          >
            {title}
          </motion.h1>
          <p className="text-gray-400 text-sm leading-relaxed">{description}</p>

          {/* Action Buttons */}
          <div className="mt-4 flex flex-wrap gap-3">
            {sourceCode && (
              <Link
                href={sourceCode}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600/20 border border-purple-500/30 text-purple-400 text-sm font-medium hover:bg-purple-600/30 hover:border-purple-500/50 transition-all duration-300"
              >
                <GithubIcon />
                <span>View Source Code</span>
              </Link>
            )}
            {website && (
              <Link
                href={website}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600/20 border border-cyan-500/30 text-cyan-400 text-sm font-medium hover:bg-cyan-600/30 hover:border-cyan-500/50 transition-all duration-300"
              >
                <GlobeIcon />
                <span>View Website</span>
              </Link>
            )}
          </div>
        </div>

        {/* Index Number */}
        <div className="absolute top-4 right-4 text-[80px] font-bold text-white/5 leading-none pointer-events-none">
          0{index + 1}
        </div>
      </div>
    </motion.div>
  );
};
