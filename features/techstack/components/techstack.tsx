"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

import { TECH_STACK } from "../data/tech-stack";
import { Panel, PanelContent, PanelHeader, PanelTitle } from "../../panel";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GROUP_LABEL, GROUP_ORDER } from "../config";
import { LayoutGroup, motion } from "motion/react";

import { useState, useMemo, Fragment } from "react";
import { TechGroup } from "../types/tech-stack";

export function TechStack() {
  const [sorted, setSorted] = useState(false);

  const skills = useMemo(() => {
    if (!sorted) return TECH_STACK;

    return [...TECH_STACK].sort((a, b) => {
      return GROUP_ORDER[a.group] - GROUP_ORDER[b.group];
    });
  }, [sorted]);

  const groupedSkills = useMemo(() => {
    if (!sorted) return null;

    const groups = new Map<TechGroup, typeof TECH_STACK>();

    for (const tech of TECH_STACK) {
      if (!groups.has(tech.group)) {
        groups.set(tech.group, []);
      }
      groups.get(tech.group)!.push(tech);
    }

    return [...groups.entries()].sort(
      ([a], [b]) => GROUP_ORDER[a] - GROUP_ORDER[b],
    );
  }, [sorted]);

  return (
    <Panel id="skills">
      <PanelHeader className="flex items-center justify-between">
        <PanelTitle>Skills</PanelTitle>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="flex items-center justify-center cursor-pointer text-secondary-foreground hover:text-foreground transition-[color] duration-300 -m-2"
              onClick={() => setSorted((prev) => !prev)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 100 100"
                version="1.1"
                x="0px"
                y="0px"
                className="w-9 h-9"
              >
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g fillRule="nonzero" fill="currentColor">
                    <path d="M57.5521965,64.9913636 L64.2379481,58.2673377 C64.6247846,57.8782866 64.9420796,58.0080705 64.9420796,58.5618109 L64.9420796,62.3126369 C64.9420796,62.8636012 64.6235552,63.6356204 64.2306354,64.0307896 L55.5360056,72.775194 C55.1384531,73.1750225 54.506037,73.1703632 54.1131172,72.775194 L45.4184874,64.0307896 C45.0209349,63.6309612 44.7070432,62.8663773 44.7070432,62.3126369 L44.7070432,58.5618109 C44.7070432,58.0108465 45.0222936,57.8762304 45.4111747,58.2673377 L52.0969263,64.9913636 C52.4837628,65.3804147 52.8010578,65.2508383 52.8010578,64.6973539 L52.8010578,49.2288697 C52.8010578,48.6761714 53.248945,48.2266976 53.8014418,48.2266976 L55.847681,48.2266976 C56.3995017,48.2266976 56.848065,48.6753853 56.848065,49.2288697 L56.848065,64.6973539 C56.848065,65.2500523 57.1633154,65.382471 57.5521965,64.9913636 Z M43.4478035,35.0086364 L36.7620519,41.7326623 C36.3752154,42.1217134 36.0579204,41.9919295 36.0579204,41.4381891 L36.0579204,37.6873631 C36.0579204,37.1363988 36.3764448,36.3643796 36.7693646,35.9692104 L45.4639944,27.224806 C45.8615469,26.8249775 46.493963,26.8296368 46.8868828,27.224806 L55.5815126,35.9692104 C55.9790651,36.3690388 56.2929568,37.1336227 56.2929568,37.6873631 L56.2929568,41.4381891 C56.2929568,41.9891535 55.9777064,42.1237696 55.5888253,41.7326623 L48.9030737,35.0086364 C48.5162372,34.6195853 48.1989422,34.7491617 48.1989422,35.3026461 L48.1989422,50.7711303 C48.1989422,51.3238286 47.751055,51.7733024 47.1985582,51.7733024 L45.152319,51.7733024 C44.6004983,51.7733024 44.151935,51.3246147 44.151935,50.7711303 L44.151935,35.3026461 C44.151935,34.7499477 43.8366846,34.617529 43.4478035,35.0086364 Z" />
                  </g>
                </g>
              </svg>
            </button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{sorted ? "default" : "sort"}</p>
          </TooltipContent>
        </Tooltip>
      </PanelHeader>

      <PanelContent
        className={cn(
          "overflow-hidden",
          "bg-white/0.75",
          "bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)]",
          "bg-size-[10px_10px] bg-center",
          "[--pattern-foreground:var(--color-border)]/30",
        )}
      >
        {sorted ? (
          <div className="font-mono text-xs text-secondary-foreground/20 absolute top-10 right-3 select-none">
            hover around
          </div>
        ) : (
          ""
        )}
        <LayoutGroup>
          <motion.div
            initial={false}
            animate={{
              scaleY: sorted ? 1 : 0.98,
              opacity: 1,
            }}
            transition={{
              scaleY: {
                duration: 0.35,
                ease: [0.4, 0, 0.2, 1],
              },
            }}
            style={{ transformOrigin: "top" }}
          >
            <motion.ul
              layout
              transition={{
                layout: {
                  duration: 0.45,
                  ease: "easeInOut",
                },
              }}
              className="flex flex-wrap gap-2 select-none"
            >
              {sorted
                ? groupedSkills!.map(([group, items]) => (
                    <motion.li
                      key={group}
                      layout
                      className={cn(
                        "relative rounded-lg p-1.5",
                        "border border-dashed border-transparent",
                        "hover:border-border transition-colors",
                        "hover:bg-secondary-foreground/4",
                        "group overflow-visible",
                      )}
                    >
                      <div
                        className={cn(
                          "pointer-events-none",
                          "absolute -top-2.5 -left-2.5 z-10",
                          "rounded bg-selection",
                          "px-1.5 py-0.5",
                          "text-[11px] font-mono uppercase tracking-wider",
                          "text-selection-foreground",
                          "opacity-0 translate-y-[-2px]",
                          "group-hover:opacity-100 group-hover:translate-y-0",
                          "transition-all duration-200 ease-out",
                        )}
                      >
                        {GROUP_LABEL[group]}
                      </div>

                      <motion.ul layout className="flex flex-wrap gap-2">
                        {items.map((tech) => (
                          <motion.li
                            key={tech.key}
                            layout
                            layoutId={`tech-${tech.key}`}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 40,
                            }}
                          >
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
                          </motion.li>
                        ))}
                      </motion.ul>
                    </motion.li>
                  ))
                : skills.map((tech, index) => {
                    const prev = skills[index - 1];
                    const isNewGroup =
                      sorted && prev && prev.group !== tech.group;

                    return (
                      <Fragment key={tech.key}>
                        {isNewGroup && (
                          <motion.li layout className="w-full h-0" />
                        )}
                        <motion.li
                          key={tech.key}
                          layout
                          layoutId={`tech-${tech.key}`}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 40,
                          }}
                          className="flex"
                        >
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
                        </motion.li>
                      </Fragment>
                    );
                  })}
            </motion.ul>
          </motion.div>
        </LayoutGroup>
      </PanelContent>
    </Panel>
  );
}
