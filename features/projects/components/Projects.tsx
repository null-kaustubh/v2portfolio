import { Panel, PanelContent, PanelHeader, PanelTitle } from "@/features/panel";
import ProjectItem from "./ProjectItem";
import { blurhashToBase64 } from "blurhash-base64";
import { projects } from "../data/projects";

export default function Projects() {
  const projectsWithBlur = projects.map((project) => ({
    ...project,
    blurDataURL: blurhashToBase64(project.blurhash),
  }));

  return (
    <Panel id="projects">
      <PanelHeader>
        <PanelTitle>Projects</PanelTitle>
      </PanelHeader>

      <PanelContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {projectsWithBlur.map((project) => (
            <ProjectItem key={project.slug} project={project} />
          ))}
        </div>
      </PanelContent>
    </Panel>
  );
}
