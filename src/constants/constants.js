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
  chatgpt,
  booking,
  gym,
  pinterest,
  github,
  linkedin,
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
    title: "Support & AI Systems Engineering",
    icon: "/frontend.jpg",
    description: "Bridging support and engineering with code-level debugging, KQL diagnostics, and full dev-to-prod delivery for an enterprise platform serving 7M users.",
    skills: ["C# / .NET", "JavaScript / TypeScript", "React", "KQL", "Azure DevOps", "Git"],
    background: "Frontend"
  },
  {
    title: "AI & Generative Systems",
    icon: "/AI.jpg",
    description: "Architecting RAG-based knowledge retrieval, autonomous ticket workflows, and generative AI features on Azure OpenAI — led the rollout of GPT-4.5 and DALL-E to pilot clients.",
    skills: ["Azure OpenAI", "RAG Pipelines", "Vector Search", "Python", "Zendesk AI", "Codex"],
    background: "AI"
  },
  {
    title: "Game Modding & Scripting",
    icon: "/game.jpg",
    description: "Developing custom game mods and scripts using Lua and FiveM for GTA V.",
    skills: ["Lua", "FiveM", "Game Development", "Custom Physics", "Multiplayer"],
    background: "Game"
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
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "vite",
    icon: vite,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: three,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "mui",
    icon: mui,
  },
];

const experiences = [
  {
    title: "Senior Technical Support Engineer",
    company_name: "Akumina",
    icon: ak,
    iconBg: "#383E56",
    date: "April 2022 - Present",
    points: [
      "Debug across the full stack — C#/.NET, JS/TS, and JSX — to reproduce bugs, compare product releases via Git version history, and document findings through product triage. Commit customer-specific API configs, DLLs, and deployment requests directly, bridging support and engineering.",
      "Built and maintain a versioned KQL diagnostic library used by support and engineering, covering deployment errors, authentication failures, SharePoint communication issues, API endpoint health, AI endpoint errors, search degradation, and cloud performance metrics — cutting issue resolution times by 50%.",
      "Shipped React/JSX view templates and UI components for client-facing customizations, including data callbacks and UI logic, from dev testing through CI/CD to production. Authored CI/CD pipeline scripts that reduced upgrade durations by 60%.",
      "Led support-side engineering for Akumina's generative AI rollout — primary technical lead delivering Azure OpenAI (GPT-4.5, DALL-E) features to pilot clients in the CMS content authoring workflow. Debugged AI API endpoints across dev/prod clouds, validated connectivity end-to-end, and trained the support team on new tooling.",
      "Architected a RAG-based knowledge retrieval system on Azure OpenAI that indexes ticket descriptions, KB articles, and resolved tickets to surface relevant context at ticket open — reducing KB search time by 50% and overall resolution time by 25%. Collaborated with engineering on vector DB setup, embedding pipelines, and Azure AI Search configuration.",
      "Engineered 5 autonomous Zendesk AI response workflows covering widgets, API issues, customization/project-kickoff, cloud hosting/outages, and upgrades — auto-summarizing ticket status for cross-functional visibility across Support, Customer Success, and Engineering.",
      "Managed global build deployments and environment-specific configurations via Azure DevOps CI/CD, maintaining 24/7 availability for a 7M-user platform.",
      "Technologies: Python, C#/.NET, JavaScript/TypeScript, React, KQL, Azure DevOps, Azure OpenAI, Git",
    ],
  },
  {
    title: "Full Stack & Infrastructure Engineer",
    company_name: "Freelance",
    icon: freelance,
    iconBg: "#E6DEDD",
    date: "Jan 2018 - Present",
    points: [
      "Built a React-based 3D model inspection tool that calculates volume and length measurements from OBJ and STL files — replicating core slicer functionality for rapid pre-print prototype review. Started as a weekend project and iterated over time to add shape recognition.",
      "Design and ship custom React/Next.js frontend features for clients who need functionality outside standard project scope — JSX components, data callback logic, and UI integrations delivered through a full dev-to-prod cycle.",
      "Use Codex and local LLMs (Qwen3-coder) regularly to prototype product ideas, accelerate development cycles, and explore architecture tradeoffs.",
      "Supported infrastructure for an enterprise pharma client during a large-scale Active Directory domain migration, resolving technical escalations throughout the transition.",
      "Develop custom FiveM multiplayer server modifications in Lua to optimize server performance and create engaging player experiences.",
    ],
  },
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
    name: "3D Model Inspector (Slicer-style)",
    description:
      "React-based tool that calculates volume and length measurements from OBJ and STL files for quick pre-print inspection of 3D models — replicates core slicer functionality, with iterative shape-recognition features built over time.",
    tags: [
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
    image: scanner,
    source_code_link: "https://github.com/akngngr",
  },
  {
    name: "DALL-E 2.0 Clone",
    description:
      "Web-based platform that allows users to create and post AI images generated by DALL-E Chat GPT engine, providing a social timeline to allow users view and collaborate artwork.",
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
    name: "Chat GPT AI Clone",
    description:
      "Web application that allows users to search for answers to any questions using Chat GPT 3.5 engine.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "restapi",
        color: "green-text-gradient",
      },
      {
        name: "scss",
        color: "pink-text-gradient",
      },
    ],
    image: chatgpt,
    source_code_link: "https://github.com/akngngr/codex",
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
      "A comprehensive gym exercise platform that allows users to search all kinds of exercises by muscle group, exercise or equipment type. With the functionality to choose exercise categories and specific muscle groups, browse more than one thousand exercises with practical examples, pagination, exercise details, pull related videos from Youtube, display similar exercises, and much more.",
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
  },
  {
    name: "Crypto Tracker",
    description:
      "View live changes on Crypto.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "axios",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: crypto,
    source_code_link: "https://github.com/akngngr/crypto-api-project",
  },
  {
    name: "Pinterest Clone",
    description:
      "A Pinterest-style image discovery and collection app with masonry layouts and search.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "MUI",
        color: "skyblue-text-gradient",
      },
      {
        name: "axios",
        color: "green-text-gradient",
      },
    ],
    image: pinterest,
    source_code_link: "https://github.com/",
  },
];

export { services, technologies, experiences, testimonials, projects };
