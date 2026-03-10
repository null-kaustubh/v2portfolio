import ProjectPageClient from "./projectPageClient";
import { getProjectPreviews } from "@/features/portfolio/projects/data/projects";

export const dynamic = "force-static";

export default function ProjectPageSsr() {
  const projects = getProjectPreviews();
  return <ProjectPageClient projects={projects} />;
}
