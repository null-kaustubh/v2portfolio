import { slugify } from "../../../lib/slugify";

export type ProjectStatus = "live" | "in development" | "on hiatus";

export type Project = {
  title: string;
  description: string;
  image: string;
  blurhash: string;
  status: ProjectStatus;
  tech: string[];
  slug: string;
};

export const projects: Project[] = [
  {
    title: "Journl",
    description: "A journaling app for developers to document learning.",
    image: "https://assets.kaustubh.cloud/images/og-image.png",
    blurhash: "U35#bB~qxuD%_3?bxuIo9FIUoexu004nM{%M",
    status: "in development",
    tech: ["Next.js", "PostgreSQL", "Prisma", "NextAuth"],
    slug: slugify("Journl"),
  },
  {
    title: "Code Snippet Studio",
    description: "Turn code snippets into beautiful images.",
    image: "https://assets.kaustubh.cloud/images/og-image.png",
    blurhash: "U35#bB~qxuD%_3?bxuIo9FIUoexu004nM{%M",
    status: "live",
    tech: ["Next.js", "Tailwind", "Canvas"],
    slug: slugify("Code Snippet Studio"),
  },
  {
    title: "Normal",
    description: "A journaling app for developers to document learning.",
    image: "https://assets.kaustubh.cloud/images/og-image.png",
    blurhash: "U35#bB~qxuD%_3?bxuIo9FIUoexu004nM{%M",
    status: "on hiatus",
    tech: ["Next.js", "PostgreSQL", "Prisma", "NextAuth"],
    slug: slugify("Normal"),
  },
  {
    title: "Newer",
    description: "Turn code snippets into beautiful images.",
    image: "https://assets.kaustubh.cloud/images/og-image.png",
    blurhash: "U35#bB~qxuD%_3?bxuIo9FIUoexu004nM{%M",
    status: "live",
    tech: ["Next.js", "Tailwind", "Canvas"],
    slug: slugify("Newer"),
  },
];
