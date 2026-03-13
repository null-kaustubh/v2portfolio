export type ProjectStatus = "live" | "in development" | "on hiatus";

export type ProjectTypes = {
  title: string;
  description: string;
  image: string;
  status: ProjectStatus;
  tech: string[];
  slug: string;
  date?: string;
  githubUrl?: string;
  liveUrl?: string;
};
