import { ASSETS_REPO } from "@/lib/constants";
import { ExperienceList } from "../types/experienceType";

export const Experience: ExperienceList = [
  {
    company: "Vidyalankar Institute of Technology",
    logo: `${ASSETS_REPO}/workplaces/VIT.png`,
    role: "B.E Electronics Engineering (Data Science Hons.)",
    employmentType: null,
    status: "ended",
    from: "2021-11",
    to: "2025-06",
    description: [
      "Built a strong foundation in computer science and data structures while developing multiple full-stack projects focused on real-world problem solving.",
    ],
  },
  {
    company: "Saint-Gobain INDEC",
    logo: `${ASSETS_REPO}/workplaces/INDEC.png`,
    role: "Salesforce Developer",
    employmentType: "internship",
    status: "ended",
    from: "2024-08",
    to: "2024-12",
    description: [
      "Automated business workflows and built dashboards using Salesforce, contributing to a production go-live while working with Apex and platform tools.",
    ],
  },
  {
    company: "AlterIt",
    logo: `${ASSETS_REPO}/workplaces/Freelance.png`,
    role: "Fullstack Developer",
    employmentType: "freelance",
    status: "ended",
    from: "2024-07",
    to: "2026-02",
    description: [
      "Built and optimized full-stack applications for clients, driving performance, SEO improvements, and scalable architecture across modern web stacks.",
    ],
  },
  {
    company: "Accelya",
    logo: `${ASSETS_REPO}/workplaces/accelya.png`,
    role: "Software Development Engineer - 1",
    employmentType: "fulltime",
    status: "active",
    from: "2025-09",
    to: null,
    description: [
      "Shipping production-grade backend features for Swiss airline LX’s cargo platform, debugging complex enterprise systems and ensuring stable, high-quality releases.",
    ],
  },
];
