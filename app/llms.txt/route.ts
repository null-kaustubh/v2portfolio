import { SITE_INFO, SOCIAL_PROFILES } from "@/config/site";
import { getAllBlogs } from "@/features/blog/data/blogs";
import { USER } from "@/features/portfolio/profile/data/user";
import { getAllProjects } from "@/features/project/data/projects";

export const dynamic = "force-static";

export function GET() {
  const projects = getAllProjects();
  const blogs = getAllBlogs();

  const body = [
    `# ${USER.displayName}`,
    "",
    `> ${USER.bio} ${USER.jobTitle}${
      USER.jobs[0]?.company ? ` at ${USER.jobs[0].company}` : ""
    }, based in ${USER.address}.`,
    "",
    USER.about.trim(),
    "",
    "## Pages",
    "",
    `- [Home](${SITE_INFO.url}): Profile, career timeline, tech stack, open-source contributions.`,
    `- [Projects](${SITE_INFO.url}/projects): All shipped and in-progress projects.`,
    `- [Blogs](${SITE_INFO.url}/blogs): Written posts.`,
    "",
    "## Projects",
    "",
    ...projects.map(
      (project) =>
        `- [${project.metadata.title}](${SITE_INFO.url}/projects/${project.slug}): ${project.metadata.description} Status: ${project.metadata.status}. Built with ${project.metadata.tech.join(", ")}.`,
    ),
    "",
    "## Blogs",
    "",
    ...blogs.map(
      (blog) =>
        `- [${blog.metadata.title}](${SITE_INFO.url}/blogs/${blog.slug}): ${blog.metadata.description} Published ${blog.metadata.createdAt}.`,
    ),
    "",
    "## Elsewhere",
    "",
    ...SOCIAL_PROFILES.map((url) => `- ${url}`),
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
