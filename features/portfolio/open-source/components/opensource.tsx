"use client";

import { Panel, PanelContent, PanelHeader, PanelTitle } from "@/features/panel";
import { mockContributions } from "../data/mockContributions";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUp, ArrowUpRight } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { ASSETS_REPO } from "@/lib/constants";

export default function OpenSource() {
  const contributions = [...mockContributions].sort((a, b) => {
    const order = { merged: 0, open: 1, closed: 2 };
    return order[a.status] - order[b.status];
  });

  const hasContributions = contributions.length > 0;
  const [expanded, setExpanded] = useState(false);

  const visibleContributions = expanded
    ? contributions.slice(0, 6)
    : contributions.slice(0, 3);

  return (
    <Panel id="open-source">
      <PanelHeader>
        <PanelTitle>Open Source Contributions</PanelTitle>
      </PanelHeader>

      <PanelContent>
        {hasContributions ? (
          <div className="divide-y divide-border/60">
            {visibleContributions.map((c, index) => (
              <Link
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                key={`${c.id}-${index}`}
                className="relative px-2 py-3 first:pt-2 flex flex-col sm:flex-row gap-2 sm:items-center justify-between group"
              >
                <div className="flex items-start sm:items-center gap-2 text-secondary-foreground">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="relative w-4 h-4 mt-0.5 sm:mt-0 shrink-0">
                          {c.status === "merged" && (
                            <Image
                              src={`${ASSETS_REPO}/images/github-merged.svg`}
                              alt="merged"
                              fill
                              unoptimized
                              className="object-contain"
                              draggable={false}
                              loading="lazy"
                            />
                          )}
                          {c.status === "open" && (
                            <Image
                              src={`${ASSETS_REPO}/images/github-pr.svg`}
                              alt="open"
                              fill
                              unoptimized
                              className="object-contain"
                              draggable={false}
                              loading="lazy"
                            />
                          )}
                          {c.status === "closed" && (
                            <Image
                              src={`${ASSETS_REPO}/images/github-closed.svg`}
                              alt="closed"
                              fill
                              unoptimized
                              className="object-contain"
                              draggable={false}
                              loading="lazy"
                            />
                          )}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="left">
                        {c.status === "merged"
                          ? "Merged"
                          : c.status === "closed"
                            ? "Closed"
                            : "Open"}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1 leading-tight">
                    <span className="font-mono text-primary-foreground tracking-tight text-sm sm:text-base">
                      {c.repo}
                    </span>
                    <span className="text-secondary-foreground text-sm sm:text-base sm:translate-y-px sm:ml-1 sm:mt-0 -ml-6 mt-1">
                      {c.title}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 sm:gap-2 text-secondary-foreground font-mono text-xs sm:text-sm group-hover:text-primary-foreground transition-all sm:self-auto absolute right-3 top-3 sm:static">
                  <div>#{c.prId}</div>
                  <ArrowUpRight
                    size={14}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  />
                </div>
              </Link>
            ))}
            {contributions.length > 3 && (
              <div className="pt-4 flex items-center justify-center">
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="group inline-flex items-center gap-1.5
                  text-sm uppercase font-mono text-secondary-foreground
                  hover:text-foreground transition-colors cursor-pointer"
                >
                  {expanded ? "Show less" : "See more"}
                  {expanded ? (
                    <ArrowUp
                      size={16}
                      className="translate-y-[0.5px] transition-transform group-hover:-translate-y-0.5"
                    />
                  ) : (
                    <ArrowDown
                      size={16}
                      className="-translate-y-[0.5px] transition-transform group-hover:translate-y-0.5"
                    />
                  )}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-secondary-foreground font-mono lowercase text-xs sm:text-sm">
            Actively exploring open source, contributions coming soon...
          </div>
        )}
      </PanelContent>
    </Panel>
  );
}
