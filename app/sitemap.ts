import type { MetadataRoute } from "next";

import { SITE_INFO } from "@/config/site";
import { getAllBlogs } from "@/features/blog/data/blogs";
import { getAllProjects } from "@/features/project/data/projects";

function toDate(value?: string) {
  const date = value ? new Date(value) : new Date();
  return Number.isNaN(date.getTime()) ? new Date() : date;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getAllProjects();
  const blogs = getAllBlogs();

  // Most recent content edit drives `lastModified` on the listing pages.
  const latest = (dates: string[]) =>
    dates.length
      ? dates.map(toDate).sort((a, b) => b.getTime() - a.getTime())[0]
      : new Date();

  const routes: MetadataRoute.Sitemap = [
    {
      url: SITE_INFO.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_INFO.url}/projects`,
      lastModified: latest(projects.map((p) => p.metadata.updatedAt)),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_INFO.url}/blogs`,
      lastModified: latest(blogs.map((b) => b.metadata.updatedAt)),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${SITE_INFO.url}/projects/${project.slug}`,
    lastModified: toDate(project.metadata.updatedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${SITE_INFO.url}/blogs/${blog.slug}`,
    lastModified: toDate(blog.metadata.updatedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...routes, ...projectRoutes, ...blogRoutes];
}
