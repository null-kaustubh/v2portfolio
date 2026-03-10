import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { cache } from "react";

import type {
  Project,
  ProjectMetadata,
} from "@/features/project/types/project";

function parseFrontmatter(fileContent: string) {
  const file = matter(fileContent);

  return {
    metadata: file.data as ProjectMetadata,
    content: file.content,
  };
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);

  return mdxFiles.map<Project>((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));

    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export const getAllProjects = cache(() => {
  return getMDXData(path.join(process.cwd(), "features/project/content")).sort(
    (a, b) => {
      return (
        new Date(b.metadata.createdAt).getTime() -
        new Date(a.metadata.createdAt).getTime()
      );
    },
  );
});

export function getProjectBySlug(slug: string) {
  return getAllProjects().find((project) => project.slug === slug);
}
