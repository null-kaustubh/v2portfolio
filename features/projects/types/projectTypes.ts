export type ProjectStatus = "live" | "in development" | "on hiatus";

export type Project = {
  title: string;
  description: string;
  image: string;
  blurhash: string;
  status: ProjectStatus;
  tech: string[];
  slug: string;
  date?: string;
};
