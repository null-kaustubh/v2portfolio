import { slugify } from "../../../../lib/slugify";
import { Project } from "../types/projectTypes";

export const projects: Project[] = [
  {
    title: "Journl",
    description: "A journaling app for developers to document learning.",
    image: "https://assets.kaustubh.cloud/images/og-image.png",
    blurhash: "L35#bB~qxuD%_3?bxuIo9FIUoexu",
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
  {
    title: "Newest",
    description: "Turn code snippets into beautiful images.",
    image: "https://assets.kaustubh.cloud/images/og-image.png",
    blurhash: "U35#bB~qxuD%_3?bxuIo9FIUoexu004nM{%M",
    status: "live",
    tech: ["Next.js", "Tailwind", "Node.js", "PostgreSQL"],
    slug: slugify("Newest"),
  },
  {
    title: "Recall",
    description: "Turn code snippets into beautiful images.",
    image: "https://assets.kaustubh.cloud/images/og-image.png",
    blurhash: "U35#bB~qxuD%_3?bxuIo9FIUoexu004nM{%M",
    status: "live",
    tech: ["Next.js", "Tailwind", "MongoDb"],
    slug: slugify("Recall"),
  },
];
