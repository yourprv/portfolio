import { FaFacebook } from "react-icons/fa";
import { RxGithubLogo, RxTwitterLogo, RxLinkedinLogo } from "react-icons/rx";

export const SKILL_DATA = [
  {
    skill_name: "HTML",
    image: "html.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "CSS",
    image: "css.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "JavaScript",
    image: "js.png",
    width: 65,
    height: 65,
  },
  {
    skill_name: "Tailwind CSS",
    image: "tailwind.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "React",
    image: "react.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Redux",
    image: "redux.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "React Query",
    image: "reactquery.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "TypeScript",
    image: "ts.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Next.js 14",
    image: "next.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Framer Motion",
    image: "framer.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Stripe",
    image: "stripe.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Node.js",
    image: "node.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "MongoDB",
    image: "mongodb.png",
    width: 40,
    height: 40,
  },
] as const;

export const SOCIALS = [
  {
    name: "GitHub",
    icon: RxGithubLogo,
    link: "https://github.com/yourprv",
  },
  {
    name: "LinkedIn",
    icon: RxLinkedinLogo,
    link: "https://www.linkedin.com/in/yourprv-developer-65b70b409/",
  },
  {
    name: "Twitter",
    icon: RxTwitterLogo,
    link: "https://x.com/your_prv",
  },
] as const;

export const FRONTEND_SKILL = [
  {
    skill_name: "HTML",
    image: "html.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "CSS",
    image: "css.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "JavaScript",
    image: "js.png",
    width: 65,
    height: 65,
  },
  {
    skill_name: "Tailwind CSS",
    image: "tailwind.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Material UI",
    image: "mui.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "React",
    image: "react.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Redux",
    image: "redux.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "React Query",
    image: "reactquery.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "TypeScript",
    image: "ts.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Next.js 14",
    image: "next.png",
    width: 80,
    height: 80,
  },
] as const;

export const BACKEND_SKILL = [
  {
    skill_name: "Node.js",
    image: "node.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Express.js",
    image: "express.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "MongoDB",
    image: "mongodb.png",
    width: 40,
    height: 40,
  },
  {
    skill_name: "Firebase",
    image: "firebase.png",
    width: 55,
    height: 55,
  },
  {
    skill_name: "PostgreSQL",
    image: "postgresql.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "MySQL",
    image: "mysql.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Prisma",
    image: "prisma.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Graphql",
    image: "graphql.png",
    width: 80,
    height: 80,
  },
] as const;

export const FULLSTACK_SKILL = [
  {
    skill_name: "React Native",
    image: "reactnative.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Tauri",
    image: "tauri.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Docker",
    image: "docker.png",
    width: 70,
    height: 70,
  },

  {
    skill_name: "Figma",
    image: "figma.png",
    width: 50,
    height: 50,
  },
] as const;

export const OTHER_SKILL = [
  {
    skill_name: "Go",
    image: "go.png",
    width: 60,
    height: 60,
  },
] as const;

export type Project = {
  title: string;
  description: string;
  image: string;
  sourceCode?: string;
  website?: string;
};

export const PROJECTS: Project[] = [
  {
    title: "Business POS",
    description:
      "A professional Point of Sale system designed for internal use across 4-5 devices to embark and digitalize your business operations. Features inventory management, sales tracking, receipt generation, and real-time analytics. Built with modern web technologies for reliability and performance in retail environments.",
    image: "/2.png",
    sourceCode: "https://github.com/yourprv/POS",
  },
  {
    title: "Hotel Maxx redesign",
    description:
      "A world-class website for any 4-star hotel featuring cutting-edge AI integration. Includes AI-powered chatbots for instant guest support, smart room recommendation engines, dynamic pricing displays, automated booking confirmations, and personalized experience suggestions. Built with modern web technologies ensuring seamless reservations, elegant room showcases, and an immersive visual journey that reflects luxury hospitality.",
    image: "/4.png",
    sourceCode: "https://github.com/yourprv/Hotel-Website",
    website: "https://hotel-website-yourprv.vercel.app",
  },
  {
    title: "NEB GPA Calculator",
    description:
      "Simple NEB GPA calculator for 11th and 12th students. Calculate semester and annual GPA using NEB grading criteria with a clean, easy-to-use interface.",
    image: "/5.png",
    sourceCode: "https://github.com/yourprv/NEB-GPA-CALCULATOR",
    website: "https://nebgpacalculator.vercel.app",
  },
  {
    title: "SEE GPA Calculator",
    description:
      "Trusted and verified open source SEE GPA Calculator for SEE students. Accurately calculate your Secondary Education Examination Grade Point Average with support for all subjects and grading criteria. Simple, fast, and reliable tool helping thousands of Nepali students track their academic performance.",
    image: "/3.png",
    sourceCode: "https://github.com/yourprv/SEE-GPA-CALCULATOR",
    website: "https://see-gpa-calculator.vercel.app",
  },
];

export const FOOTER_DATA = [
  {
    title: "Community",
    data: [
      {
        name: "GitHub",
        icon: RxGithubLogo,
        link: "https://github.com/yourprv",
      },
    ],
  },
  {
    title: "Social Media",
    data: [
      {
        name: "Facebook",
        icon: FaFacebook,
        link: "https://www.facebook.com/profile.php?id=61589605165400",
      },
      {
        name: "Twitter",
        icon: RxTwitterLogo,
        link: "https://x.com/your_prv",
      },
      {
        name: "Linkedin",
        icon: RxLinkedinLogo,
        link: "https://www.linkedin.com/in/yourprv-developer-65b70b409/",
      },
    ],
  },
  {
    title: "About",
    data: [
      {
        name: "Become Sponsor",
        icon: null,
        link: "https://www.youtube.com/@voxprv",
      },
      {
        name: "Contact: yourprvdeveloper@proton.me",
        icon: null,
        link: "mailto:yourprvdeveloper@proton.me",
      },
    ],
  },
] as const;

export const NAV_LINKS = [
  {
    title: "About me",
    link: "/about",
  },
  {
    title: "Skills",
    link: "/#skills",
  },
  {
    title: "Projects",
    link: "/#projects",
  },
  {
    title: "Testimonials",
    link: "/#testimonials",
  },
] as const;

export const LINKS = {
  sourceCode: "https://github.com/sanidhyy/space-portfolio",
};

export const TESTIMONIALS = [
  {
    name: "Rabin B.C",
    role: "CEO of Fashion99",
    image: "/client.jpg",
    testimonial:
      "Working with YourPRV on our POS system was an absolute game-changer for Fashion99. The system streamlined our entire retail operation, from inventory management to sales tracking. Professional, efficient, and delivered beyond expectations!",
  },
] as const;
