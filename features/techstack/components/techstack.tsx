import Image from "next/image";
import { cn } from "@/lib/utils";

import { TECH_STACK } from "../data/tech-stack";
import { Panel, PanelContent, PanelHeader, PanelTitle } from "../../panel";

export function TechStack() {
  return (
    <Panel id="skills">
      <PanelHeader>
        <PanelTitle>Skills</PanelTitle>
      </PanelHeader>

      <PanelContent
        className={cn(
          "bg-white/0.75 bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)] bg-size-[10px_10px] bg-center [--pattern-foreground:var(--color-border)]/30",
        )}
      >
        <ul className="flex flex-wrap gap-2 select-none">
          {TECH_STACK.map((tech) => {
            return (
              <li key={tech.key} className="flex">
                <div className="flex items-center gap-1.5 rounded-md border border-border bg-background px-2 py-1.5 text-xs font-mono text-secondary-foreground hover:text-foreground transition-[color] duration-300">
                  <div className="relative h-4 w-4 shrink-0">
                    {/* Default (light-mode) icon */}
                    <Image
                      src={`https://assets.kaustubh.cloud/tech-stack-icons/${tech.key}.svg`}
                      alt={tech.title}
                      fill
                      unoptimized
                      className={cn(
                        "object-contain",
                        tech.themed && "dark-icon-hidden",
                      )}
                    />

                    {/* Dark-mode icon (only if it exists) */}
                    {tech.themed && (
                      <Image
                        src={`https://assets.kaustubh.cloud/tech-stack-icons/${tech.key}-dark.svg`}
                        alt={tech.title}
                        fill
                        unoptimized
                        className="object-contain dark-icon-visible"
                      />
                    )}

                    <span className="sr-only">{tech.title}</span>
                  </div>
                  <div className="h-3 w-px bg-secondary-foreground/40 select-none" />
                  <span className="leading-none">{tech.title}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </PanelContent>
    </Panel>
  );
}
