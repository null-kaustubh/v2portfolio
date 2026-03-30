import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { cache } from "react";

import type {
  Project,
  ProjectMetadata,
} from "@/features/project/types/project";

type RepoStats = {
  stars: number;
  forks: number;
  watchers: number;
  openIssues: number;
  license: string | null;
  defaultBranch: string;
};

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

export async function getProjectBySlug(slug: string) {
  const project = getAllProjects().find((p) => p.slug === slug);

  if (!project) return null;

  const [readme, stats, languages] = await Promise.all([
    fetchGithubReadme(project.metadata.githubUrl),
    fetchGithubRepoStats(project.metadata.githubUrl),
    fetchGithubLanguages(project.metadata.githubUrl),
  ]);

  let content = project.content;

  if (readme) {
    content = normalizeMarkdown(
      fixGithubImagePaths(readme, project.metadata.githubUrl),
    );
  }

  return {
    ...project,
    content,
    github: {
      stats: stats
        ? {
            stars: stats.stars,
            forks: stats.forks,
            issues: stats.openIssues,
            watchers: stats.watchers,
            license: stats.license,
          }
        : undefined,
      languages,
    },
  };
}

export async function fetchGithubReadme(repoUrl: string) {
  const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) return "";

  const [, owner, repo] = match;

  const branches = ["main", "master"];

  for (const branch of branches) {
    const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/README.md`;

    const res = await fetch(rawUrl, {
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      return await res.text();
    }
  }

  return "";
}

export function normalizeMarkdown(md: string) {
  return md
    .replace(/<img/g, '<img loading="lazy"')
    .replace(/```(\w+)/g, "```$1");
}

export function fixGithubImagePaths(md: string, repoUrl: string) {
  const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) return md;

  const [, owner, repo] = match;

  return md.replace(
    /\!\[(.*?)\]\((\.\/.*?)\)/g,
    (_, alt, path) =>
      `![${alt}](https://raw.githubusercontent.com/${owner}/${repo}/main/${path.replace("./", "")})`,
  );
}

export async function fetchGithubRepoStats(
  repoUrl: string,
): Promise<RepoStats | null> {
  const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) return null;

  const [, owner, repo] = match;

  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) return null;

  const data = await res.json();

  return {
    stars: data.stargazers_count,
    forks: data.forks_count,
    watchers: data.watchers_count,
    openIssues: data.open_issues_count,
    license: data.license?.spdx_id ?? null,
    defaultBranch: data.default_branch,
  };
}

export async function fetchGithubLanguages(repoUrl: string) {
  const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) return null;

  const [, owner, repo] = match;

  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/languages`,
    { next: { revalidate: 3600 } },
  );

  if (!res.ok) return null;

  const data = await res.json();

  const total = Object.values(data).reduce((a: number, b: any) => a + b, 0);

  return Object.entries(data).map(([lang, bytes]: any) => ({
    name: lang,
    percentage: ((bytes / total) * 100).toFixed(1),
  }));
}
