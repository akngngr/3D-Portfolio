import {
  javascript,
  typescript,
  html,
  css,
  reactjs,
  tailwind,
  nodejs,
  git,
  three,
  azure,
  mui,
  vite,
  python,
  dotnet,
  docker,
  figma,
  openai,
  claude,
  freelance,
  ak,
  ubreakifix,
  crypto,
  dalle,
  booking,
  gym,
  github,
  linkedin,
  voxal,
  cad,
  enterpriseCopilot
} from "../assets";

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
    description: "Building clean, production React/TypeScript interfaces, component architecture, API integration, and UI shipped from dev to production for a 7M-user platform.",
    skills: ["React", "TypeScript", "Next.js", "JSX", "REST APIs", "Git"]
  },
  {
    title: "Forward-Deployed & AI-Integrated Delivery",
    description: "Owning the technical relationship inside enterprise client environments, architecting and shipping generative AI features (Azure OpenAI, RAG) end-to-end, from integration to live debugging.",
    skills: ["Azure OpenAI", "RAG", "Vector Search", "Python", "Claude Code", "Codex"]
  },
  {
    title: "Full-Stack & Systems",
    description: "Debugging and shipping across the API boundary when a feature needs it, C#/.NET services, SQL, and diagnostic tooling used across teams.",
    skills: ["C# / .NET", "SQL", "KQL", "Node.js", "Azure DevOps"]
  },
];



const technologies = [
  {
    name: "JavaScript",
    icon: javascript,
    docs: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    name: "TypeScript",
    icon: typescript,
    docs: "https://www.typescriptlang.org/docs/",
  },
  {
    name: "React JS",
    icon: reactjs,
    docs: "https://react.dev/",
  },
  {
    name: "Node JS",
    icon: nodejs,
    docs: "https://nodejs.org/docs/latest/api/",
  },
  {
    name: "Azure",
    icon: azure,
    docs: "https://learn.microsoft.com/en-us/azure/",
  },
  {
    name: "HTML5",
    icon: html,
    docs: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  {
    name: "CSS3",
    icon: css,
    docs: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
    docs: "https://tailwindcss.com/docs",
  },
  {
    name: "Vite",
    icon: vite,
    docs: "https://vitejs.dev/guide/",
  },
  {
    name: "Azure OpenAI",
    icon: openai,
    docs: "https://learn.microsoft.com/en-us/azure/ai-services/openai/",
  },
  {
    name: "ThreeJS",
    icon: three,
    docs: "https://threejs.org/docs/",
  },
  {
    name: "Git",
    icon: git,
    docs: "https://git-scm.com/doc",
  },
  {
    name: "MUI",
    icon: mui,
    docs: "https://mui.com/material-ui/getting-started/",
  },
  {
    name: "Python",
    icon: python,
    docs: "https://docs.python.org/3/",
  },
  {
    name: "C# / .NET",
    icon: dotnet,
    docs: "https://learn.microsoft.com/en-us/dotnet/csharp/",
  },
  {
    name: "Docker",
    icon: docker,
    docs: "https://docs.docker.com/",
  },
  {
    name: "Claude AI",
    icon: claude,
    docs: "https://docs.anthropic.com/",
  },
  {
    name: "Figma",
    icon: figma,
    docs: "https://www.figma.com/developers/",
  },
];

const experiences = [
  {
    title: "Senior Technical Support Engineer",
    company_name: "Akumina",
    icon: ak,
    iconBg: "#1c3d28",
    date: "April 2022 - July 2026",
    points: [
      "Technical delivery lead for a Fortune 500 pharmaceutical enterprise client on a 7M-user SaaS platform, owning client-facing software delivery end-to-end from scoping through production architecture and code deployment.",
      "Led the forward-deployed rollout of Azure OpenAI (GPT-4.5, DALL-E) features into live client environments, validating end-to-end connectivity and enabling client teams on new AI tooling.",
      "Built and shipped a production RAG knowledge retrieval system on Azure OpenAI with vector embeddings, embedding pipelines, and Azure AI Search, cutting search time by 50% and resolution time by 25%; designed 5 autonomous agent workflows for automated routing and summarization.",
      "Shipped custom React/JSX components and automated CI/CD deployment pipelines for bespoke client extensions, reducing upgrade cycle durations by 60%.",
      "Debugged full-stack production issues across C#/.NET, JS/TS, and React in live client environments; authored a versioned KQL diagnostic query library adopted across teams that cut root-cause triage time by 50%.",
    ],
  },
  {
    title: "Full Stack & Engineering Consultant",
    company_name: "Independent Technical Consultant",
    icon: freelance,
    iconBg: "#14b56a",
    date: "2018 - Present",
    points: [
      "Designed and shipped custom React/Next.js frontend applications, JSX components, data callback logic, and UI integrations through full dev-to-prod cycles for clients requiring bespoke functionality.",
      "Rapidly prototyped architectures and product tradeoffs with AI coding tools (Claude Code, Codex, local LLMs), building bespoke technical tools at high velocity.",
      "Built Voxal, a voxel-based 3D modeling editor, and a React-based 3D mesh inspector for OBJ/STL files with spatial parsing algorithms, custom rendering logic, and volume/length calculation pipelines.",
      "Supported critical IT infrastructure for LSNE/PCI Pharma during a large-scale Active Directory migration, maintaining operational uptime and resolving complex technical escalations.",
    ],
  },
  {
    title: "Operations Manager",
    company_name: "uBreakiFix",
    icon: ubreakifix,
    iconBg: "#f59e0b",
    date: "2020 - 2021",
    points: [
      "Managed daily service operations, coordinating staff workflows and prioritizing repair tasks based on severity and business impact.",
      "Implemented Jira ticketing workflows to track recurring incidents and streamline case handling, increasing technical service revenue by 48%.",
    ],
  },
];


const projects = [
  {
    name: "Enterprise Knowledge & Support Copilot",
    description:
      "Enterprise-grade RAG copilot that answers questions grounded in company documents: FastAPI backend, Streamlit chat UI, and pgvector embeddings served from production hosting. A dual-engine design runs Google Gemini embeddings/LLMs in the cloud with automated fallback to local Ollama models when the cloud path is slow or unreachable, so the system keeps answering through outages. PDFs are ingested, chunked, and vectorized for similarity search, and every answer returns its source chunks for verifiability.",
    tags: [
      {
        name: "rag",
        color: "blue-text-gradient",
      },
      {
        name: "fastapi",
        color: "green-text-gradient",
      },
      {
        name: "pgvector",
        color: "orange-text-gradient",
      },
      {
        name: "gemini",
        color: "pink-text-gradient",
      },
      {
        name: "streamlit",
        color: "blue-text-gradient",
      },
      {
        name: "docker",
        color: "green-text-gradient",
      },
    ],
    image: enterpriseCopilot,
    source_code_link: "https://github.com/akngngr/enterprise-copilot",
    live_link: "https://enterprise-copilot-mtua.onrender.com",
  },
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
      "React-based tool that calculates volume, length, and material estimates from OBJ and STL files for quick pre-print inspection of 3D models. It replicates core slicer functionality, including iterative shape-recognition and filament weight/length analysis for common printing materials.", tags: [
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
    source_code_link: "https://github.com/akngngr/3D-model-inspector",
    live_link: "https://printmeasure.vercel.app"
  },
  {
    name: "AI Pinboard",
    description:
      "A social timeline for AI-generated art. Create images with DALL·E and share them in a collaborative feed, backed by MongoDB persistence and a responsive Tailwind UI.",
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
      "A full-stack travel booking platform. Search flights, hotels, and rental cars, compare curated destination recommendations, and manage bookings with Supabase-backed persistence.",
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
      "Browse 1,000+ exercises filterable by muscle group or equipment, each with step-by-step guides, video tutorials, and targeted recommendations in a clean, responsive Next.js app.",
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
      "Real-time cryptocurrency tracker that pulls live prices and market trends from a public API. It includes a searchable coin list, detailed stats, and responsive charts wired through a fetch-based data layer.",
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
  }
];

export { services, technologies, experiences, projects };
