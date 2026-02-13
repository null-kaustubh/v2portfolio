import { Panel, PanelContent, PanelHeader, PanelTitle } from "@/features/panel";
import ProjectItem from "./ProjectItem";
import { blurhashToBase64 } from "blurhash-base64";
import { projects } from "../data/projects";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const PREVIEW_COUNT = 2;

export default function Projects() {
  const projectsWithBlur = projects.map((project) => ({
    ...project,
    blurDataURL: blurhashToBase64(project.blurhash),
  }));

  const previewProjects = projectsWithBlur.slice(0, PREVIEW_COUNT);
  const hasMore = projectsWithBlur.length > PREVIEW_COUNT;

  return (
    <Panel id="projects">
      <PanelHeader>
        <PanelTitle>Projects</PanelTitle>
      </PanelHeader>

      <PanelContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {previewProjects.map((project) => (
            <div
              key={project.slug}
              className="border-b border-border md:odd:border-r"
            >
              <ProjectItem key={project.slug} project={project} />
            </div>
          ))}
        </div>
        {hasMore && (
          <div className="p-4 flex items-center justify-center">
            <Link
              href="/projects"
              className="
                    group inline-flex items-center gap-1.5
                    text-sm uppercase font-mono text-secondary-foreground
                    hover:text-foreground transition-colors
                  "
            >
              View all projects
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        )}
      </PanelContent>
    </Panel>
  );
}
