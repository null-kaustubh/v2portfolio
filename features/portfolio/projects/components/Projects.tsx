import { Panel, PanelContent, PanelHeader, PanelTitle } from "@/features/panel";
import { getProjectPreviews } from "../data/projects";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProjectItemPortfolio from "./ProjectItem";

const PREVIEW_COUNT = 2;

export default function Projects() {
  const projects = getProjectPreviews();

  const previewProjects = projects.slice(0, PREVIEW_COUNT);
  const hasMore = projects.length > PREVIEW_COUNT;

  return (
    <Panel id="projects">
      <PanelHeader>
        <PanelTitle>Projects</PanelTitle>
      </PanelHeader>

      <PanelContent className="p-0">
        {projects.length === 0 ? (
          <div className="p-4 text-sm text-secondary-foreground font-mono">
            cool stuff on the way...
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2">
              {previewProjects.map((project) => (
                <div
                  key={project.slug}
                  className="border-b border-border md:odd:border-r"
                >
                  <ProjectItemPortfolio key={project.slug} project={project} />
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
          </>
        )}
      </PanelContent>
    </Panel>
  );
}
