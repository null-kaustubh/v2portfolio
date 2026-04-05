"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { GROUP_LABEL } from "../config";
import { LayoutGroup, motion } from "motion/react";
import { TechStackProps } from "../types/tech-stack";
import { Fragment } from "react/jsx-runtime";
import { ASSETS_REPO } from "@/lib/constants";

export function TechStack({ sorted, skills, groupedSkills }: TechStackProps) {
  return (
    <>
      {sorted ? (
        <div className="font-mono text-xs text-secondary-foreground/20 absolute top-10 right-3 select-none hidden md:block">
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
                        "opacity-0 -translate-y-0.5",
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
                                src={`${ASSETS_REPO}/tech-stack-icons/${tech.key}.svg`}
                                alt={tech.title}
                                fill
                                unoptimized
                                className={cn(
                                  "object-contain",
                                  tech.themed && "dark-icon-hidden",
                                )}
                                draggable={false}
                                loading="lazy"
                              />

                              {/* Dark-mode icon (only if it exists) */}
                              {tech.themed && (
                                <Image
                                  src={`${ASSETS_REPO}/tech-stack-icons/${tech.key}-dark.svg`}
                                  alt={tech.title}
                                  fill
                                  unoptimized
                                  className="object-contain dark-icon-visible"
                                  draggable={false}
                                  loading="lazy"
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
                              src={`${ASSETS_REPO}/tech-stack-icons/${tech.key}.svg`}
                              alt={tech.title}
                              fill
                              unoptimized
                              className={cn(
                                "object-contain",
                                tech.themed && "dark-icon-hidden",
                              )}
                              draggable={false}
                              loading="lazy"
                            />

                            {/* Dark-mode icon (only if it exists) */}
                            {tech.themed && (
                              <Image
                                src={`${ASSETS_REPO}/tech-stack-icons/${tech.key}-dark.svg`}
                                alt={tech.title}
                                fill
                                unoptimized
                                loading="lazy"
                                className="object-contain dark-icon-visible"
                                draggable={false}
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
    </>
  );
}
