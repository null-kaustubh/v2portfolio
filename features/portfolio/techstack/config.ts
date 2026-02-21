import type { TechGroup } from "./types/tech-stack";

export const GROUP_ORDER: Record<TechGroup, number> = {
  language: 1,
  frontend: 2,
  backend: 3,
  database: 4,
  architecture: 5,
  devops: 6,
  cloud: 7,
  tooling: 8,
};

export const GROUP_LABEL: Record<TechGroup, string> = {
  language: "Languages",
  frontend: "Frontend",
  backend: "Backend",
  database: "Databases",
  architecture: "Architecture",
  devops: "DevOps",
  cloud: "Cloud",
  tooling: "Tooling",
};
