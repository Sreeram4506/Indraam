import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";
import project6 from "@/assets/project-6.jpg";

export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: "saas" | "ai" | "platform";
  status: "ongoing" | "completed";
  stack: string;
  timeline: string;
  impact: string;
  progress: number;
  likes: number;
  date: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    id: "1",
    title: "SignalStack Cloud",
    description:
      "A multi-tenant observability platform for engineering teams, combining logs, traces, and alert routing into one fast incident workspace.",
    image: project1,
    category: "platform",
    status: "ongoing",
    stack: "Next.js, Go, ClickHouse",
    timeline: "14 week build",
    impact: "42% faster incident triage",
    progress: 68,
    likes: 234,
    date: "2026-01-15",
    tags: ["OBSERVABILITY", "PLATFORM", "B2B"],
  },
  {
    id: "2",
    title: "LedgerFlow Finance OS",
    description:
      "An internal finance operations suite that automates approvals, reconciliations, and reporting for distributed startup teams.",
    image: project2,
    category: "saas",
    status: "ongoing",
    stack: "React, Node.js, PostgreSQL",
    timeline: "10 week sprint",
    impact: "61 hours saved per month",
    progress: 35,
    likes: 189,
    date: "2026-02-03",
    tags: ["FINTECH", "WORKFLOWS", "DASHBOARD"],
  },
  {
    id: "3",
    title: "Context AI Copilot",
    description:
      "A retrieval-powered research assistant for product and support teams that turns scattered docs into grounded answers and action drafts.",
    image: project3,
    category: "ai",
    status: "completed",
    stack: "OpenAI API, Python, pgvector",
    timeline: "8 week launch",
    impact: "3.4x faster support replies",
    progress: 100,
    likes: 412,
    date: "2025-11-08",
    tags: ["AI", "RAG", "AUTOMATION"],
  },
  {
    id: "4",
    title: "Pulse Commerce Engine",
    description:
      "A conversion-focused commerce frontend with real-time merchandising, experimentation, and a performance budget tuned for global traffic.",
    image: project4,
    category: "saas",
    status: "ongoing",
    stack: "Remix, Shopify, Edge Functions",
    timeline: "12 week rollout",
    impact: "+18% checkout conversion",
    progress: 52,
    likes: 567,
    date: "2026-01-28",
    tags: ["ECOMMERCE", "EXPERIMENTS", "EDGE"],
  },
  {
    id: "5",
    title: "Orbit Dev Console",
    description:
      "A developer-facing control plane for API keys, environments, release gates, and analytics designed for teams shipping infrastructure products.",
    image: project5,
    category: "platform",
    status: "completed",
    stack: "TypeScript, tRPC, Prisma",
    timeline: "9 week release",
    impact: "27% fewer support tickets",
    progress: 100,
    likes: 298,
    date: "2025-10-19",
    tags: ["DEVELOPER TOOLS", "BILLING", "APIS"],
  },
  {
    id: "6",
    title: "Atlas Forecast Studio",
    description:
      "An AI-assisted planning workspace that helps operations teams model demand, annotate assumptions, and publish weekly forecasting snapshots.",
    image: project6,
    category: "ai",
    status: "completed",
    stack: "Vue, FastAPI, Snowflake",
    timeline: "6 week MVP",
    impact: "Forecast variance down 19%",
    progress: 100,
    likes: 176,
    date: "2025-09-02",
    tags: ["FORECASTING", "AI", "ANALYTICS"],
  },
];
