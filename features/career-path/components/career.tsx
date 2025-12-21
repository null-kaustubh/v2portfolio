import { Panel, PanelContent, PanelHeader, PanelTitle } from "@/features/panel";
import { ExperienceRow } from "./experiences";
import { Experience } from "../data/experience";

export default function Career() {
  return (
    <Panel id="career">
      <PanelHeader>
        <PanelTitle>Career</PanelTitle>
      </PanelHeader>

      <PanelContent>
        <div>
          {[...Experience].reverse().map((item) => (
            <ExperienceRow key={`${item.company}-${item.from}`} item={item} />
          ))}
        </div>
      </PanelContent>
    </Panel>
  );
}
