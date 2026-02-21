"use client";
import { Panel, PanelContent, PanelHeader, PanelTitle } from "@/features/panel";
import { ExperienceRow } from "./experiences";
import { Experience } from "../data/experience";
import { useState } from "react";

export default function Career() {
  const items = [...Experience].reverse();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <Panel id="career">
      <PanelHeader>
        <PanelTitle>Career</PanelTitle>
      </PanelHeader>

      <PanelContent className="p-3 pt-1.5">
        <div onMouseLeave={() => setActiveIndex(null)}>
          {items.map((item, i) => (
            <ExperienceRow
              key={`${item.company}-${item.from}`}
              item={item}
              isOpen={activeIndex === i}
              onHoverAction={() => setActiveIndex(i)}
            />
          ))}
        </div>
      </PanelContent>
    </Panel>
  );
}
