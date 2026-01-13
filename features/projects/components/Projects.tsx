import { Panel, PanelContent, PanelHeader, PanelTitle } from "@/features/panel";

export default function Projects() {
  return (
    <Panel id="projects">
      <PanelHeader>
        <PanelTitle>Projects</PanelTitle>
      </PanelHeader>

      <PanelContent>
        <div>
          <h2>Project 1</h2>
          <p>Description of Project 1</p>
        </div>
      </PanelContent>
    </Panel>
  );
}
