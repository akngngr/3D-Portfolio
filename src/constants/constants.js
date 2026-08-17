import {
  javascript,
  typescript,
  html,
  css,
  reactjs,
  tailwind,
  nodejs,
  mongodb,
  git,
  three,
  azure,
  mui,
  vite,
  freelance,
  ak,
  crypto,
  dalle,
  booking,
  gym,
  pinterest,
  github,
  linkedin,
  voxal,
  cad
} from "../assets";

import scanner from "../assets/project/cad.png";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
  {
    id: "linkedin",
    icon: linkedin,
    url: "https://www.linkedin.com/in/akin-gungor"
  },
  {
    id: "GitHub",
    icon: github,
    url: "https://github.com/akngngr"
  },
];

const services = [
  {
    title: "Frontend Engineering",
    icon: "/frontend.jpg",
    description: "Building clean, production React/TypeScript interfaces, component architecture, API integration, and UI shipped from dev to production for a 7M-user platform.",
    skills: ["React", "TypeScript", "Next.js", "JSX", "REST APIs", "Git"]
  },
  {
    title: "Forward-Deployed & AI-Integrated Delivery",
    icon: "/AI.jpg",
    description: "Owning the technical relationship inside enterprise client environments, architecting and shipping generative AI features (Azure OpenAI, RAG) end-to-end, from integration to live debugging.",
    skills: ["Azure OpenAI", "RAG", "Vector Search", "Python", "Claude Code", "Codex"]
  },
  {
    title: "Full-Stack & Systems",
    icon: "/game.jpg",
    description: "Debugging and shipping across the API boundary when a feature needs it, C#/.NET services, SQL, and diagnostic tooling used across teams.",
    skills: ["C# / .NET", "SQL", "KQL", "Node.js", "Azure DevOps"]
  },
];



const technologies = [
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "Azure",
    icon: azure,
  },
  {
    name: "HTML5",
    icon: html,
  },
  {
    name: "CSS3",
    icon: css,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Vite",
    icon: vite,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "ThreeJS",
    icon: three,
  },
  {
    name: "Git",
    icon: git,
  },
  {
    name: "MUI",
    icon: mui,
  },
];

const experiences = [
  {
    title: "Senior Technical Support Engineer",
    company_name: "Akumina",
    icon: ak,
    iconBg: "#383E56",
    date: "April 2022 - July 2026",
    points: [
      "Full-stack engineer owning features end-to-end React/TypeScript UI, REST API integration, and production debugging for a 7M-user platform.",
      "Served as primary technical point of contact for one of the company's largest clients, a Fortune 500 pharmaceutical company, over multiple years.",
      "Shipped React/JSX view templates and UI components for client-facing customizations, including data callbacks and UI logic, from dev testing through CI/CD to production. Authored CI/CD pipeline scripts that reduced upgrade durations by 60%.",
      "Led the technical rollout of generative AI features (Azure OpenAI, RAG-based retrieval) from pilot to production.",
    ],
  },
  {
    title: "Full Stack & Infrastructure Engineer",
    company_name: "Freelance",
    icon: freelance,
    iconBg: "#E6DEDD",
    date: "Jan 2018 - Present",
    points: [
      "Independent contractor designing and shipping custom React/Next.js frontend features end-to-end, including the 3D Model Inspector and Voxal Analytics Dashboard projects below.",
      "Use Claude Code, Codex and local LLMs (Qwen3-coder) regularly to prototype product ideas, accelerate development cycles, and explore architecture tradeoffs.",
      "Supported infrastructure for an enterprise pharma client during a large-scale Active Directory domain migration, resolving technical escalations throughout the transition.",
    ],
  }
];


const testimonials = [
  {
    testimonial:
      "",
    name: "",
    designation: "",
    company: "",
    image: "",
  },
  {
    testimonial:
      "",
    name: "",
    designation: "",
    company: "",
    image: "",
  },
  {
    testimonial:
      "",
    name: "",
    designation: "",
    company: "",
    image: "",
  },
];

const projects = [
  {
    name: "Voxal Analytics Dashboard",
    description:
      "Voice and text-driven analytics dashboard - ask a question about a dataset out loud or by typing, and Gemini parses it into a live chart. Supports CSV upload for arbitrary datasets, with dynamic schema inference and query-to-chart mapping built from scratch.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "typescript",
        color: "green-text-gradient",
      },
      {
        name: "gemini-api",
        color: "pink-text-gradient",
      },
    ],
    image: voxal,
    source_code_link: "https://github.com/akngngr/voxal-voice-dashboard",
    live_link: "https://voxal-voice-dashboard.vercel.app"
  },
  {
    name: "Printmeasure - 3D Model Inspector",
    description:
      "React-based tool that calculates volume, length, and material estimates from OBJ and STL files for quick pre-print inspection of 3D models — replicates core slicer functionality, including iterative shape-recognition and filament weight/length analysis for common printing materials.", tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "three.js",
          color: "green-text-gradient",
        },
        {
          name: "javascript",
          color: "pink-text-gradient",
        },
      ],
    image: cad,
    source_code_link: "https://github.com/akngngr",
    live_link: "https://printmeasure.vercel.app"
  },
  {
    name: "AI Pinboard",
    description:
      "Web-based platform that allows users to create and post AI images generated by DALL-E engine, providing a social timeline to allow users view and collaborate artwork.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: dalle,
    source_code_link: "https://github.com/akngngr/ai-image-social",
  },
  {
    name: "Travel Booking App",
    description:
      "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: booking,
    source_code_link: "https://github.com/akngngr/booking-app",
  },
  {
    name: "Workout App",
    description:
      "A comprehensive gym exercise platform featuring 1,000+ exercises filterable by muscle group or equipment, complete with detailed guides, video tutorials, and targeted recommendations.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: gym,
    source_code_link: "https://github.com/akngngr/gym-exercises",
  }
];

export { services, technologies, experiences, testimonials, projects };
