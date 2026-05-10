"use client";

import { motion } from "framer-motion";
import { styles } from "@/lib/styles";
import { cn } from "@/lib/utils";
import { staggerContainer } from "@/lib/motion";

type SectionWrapperProps = {
  children: React.ReactNode;
  idName?: string;
  className?: string;
};

export const SectionWrapper = ({ children, idName, className }: SectionWrapperProps) => (
  <motion.section
    variants={staggerContainer(0.1, 0.2)}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.25 }}
    className={`sm:px-16 px-6 max-w-7xl mx-auto relative z-0 py-10 ${className}`}
  >
    <span className="hash-span" id={idName}>
      &nbsp;
    </span>
    {children}
  </motion.section>
);
