"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/sub/project-card";
import { PROJECTS } from "@/constants";
import { staggerContainer } from "@/lib/motion";
import Link from "next/link";

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

const littleBounceVariants = {
  initial: { y: 0 },
  animate: {
    y: [-3, 3, -3],
    transition: {
      duration: 4,
      ease: "easeInOut" as const,
      repeat: Infinity,
    },
  },
};

const glowVariants = {
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: {
      duration: 5,
      ease: "linear" as const,
      repeat: Infinity,
    },
  },
};

export const Projects = () => {
  const HOMEPAGE_PROJECTS = PROJECTS.filter((p) => p.title !== "SEE GPA Calculator");

  return (
    <section
      id="projects"
      className="flex flex-col items-center justify-center py-20"
    >
      <motion.div
        variants={titleVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative mb-20"
      >
        <motion.div variants={littleBounceVariants} initial="initial" animate="animate">
          <motion.h1
            variants={glowVariants}
            animate="animate"
            className="text-[40px] md:text-[56px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-[length:200%_auto] drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]"
          >
            My Projects
          </motion.h1>
        </motion.div>
        <motion.div
          className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl blur-2xl -z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      </motion.div>

      <motion.div
        variants={staggerContainer(0.2, 0.3)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="h-full w-full flex flex-col md:flex-row gap-10 px-10"
      >
        {HOMEPAGE_PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.title}
            src={project.image}
            title={project.title}
            description={project.description}
            sourceCode={project.sourceCode}
            website={project.website}
            index={index}
          />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-16"
      >
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold text-lg hover:from-purple-500 hover:to-cyan-500 transition-all duration-300 shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50"
        >
          <span>View More Projects</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </motion.div>
    </section>
  );
};
