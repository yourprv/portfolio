"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/sub/project-card";
import { PROJECTS } from "@/constants";
import { staggerContainer } from "@/lib/motion";

const ADDITIONAL_PROJECTS = [
  {
    title: "Portfolio",
    description:
      "A customized 3D portfolio showcasing professional work with immersive animations and interactive elements. Features a stunning space-themed design with Three.js integration, smooth Framer Motion transitions, and responsive layouts. Perfect for developers and creatives looking to make a lasting impression with their online presence.",
    image: "/1.png",
    sourceCode: "https://github.com/yourprv/portfolio",
    website: "https://yourprvportfolio.vercel.app/",
  },
];

const ALL_PROJECTS = [...PROJECTS, ...ADDITIONAL_PROJECTS];

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

export default function ProjectsPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-20 px-4 md:px-10">
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
            className="text-[40px] md:text-[56px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-[length:200%_auto] drop-shadow-[0_0_30px_rgba(168,85,247,0.5)] text-center"
          >
            All Projects
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
        className="h-full w-full grid grid-cols-1 md:grid-cols-2 gap-10 px-4 md:px-10 max-w-7xl"
      >
        {ALL_PROJECTS.map((project, index) => (
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
    </div>
  );
}
