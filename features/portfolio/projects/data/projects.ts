import { ProjectTypes } from "../types/projectTypes";

export const projects: ProjectTypes[] = [];

import { cache } from "react";
import { ProjectPreview } from "@/features/project/types/project";
import { getAllProjects } from "@/features/project/data/projects";

export const getProjectPreviews = cache((): ProjectPreview[] => {
  const projects = getAllProjects();

  const previews = projects.map((project) => ({
    slug: project.slug,
    title: project.metadata.title,
    description: project.metadata.description,
    status: project.metadata.status,
    tech: project.metadata.tech,
    date: project.metadata.createdAt,
    image: project.metadata.image,
  }));

  return previews.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
});
