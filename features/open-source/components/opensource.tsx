import { Panel, PanelContent, PanelHeader, PanelTitle } from "@/features/panel";
import { mockContributions } from "../data/mockContributions";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function OpenSource() {
  const contributions = mockContributions;
  const hasContributions = contributions.length > 0;

  return (
    <Panel id="open-source">
      <PanelHeader>
        <PanelTitle>Open Source Contributions</PanelTitle>
      </PanelHeader>

      <PanelContent>
        {hasContributions ? (
          <div className="divide-y divide-border">
            {contributions.map((c) => (
              <Link
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                key={c.id}
                className="p-2 flex gap-2 items-center justify-between group"
              >
                <div className="flex items-center gap-2 text-secondary-foreground">
                  <div className="flex items-center gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="relative w-4.5 h-4.5 shrink-0">
                            <Image
                              src={
                                c.status === "merged"
                                  ? "https://assets.kaustubh.cloud/images/github-merged.svg"
                                  : "https://assets.kaustubh.cloud/images/github-pr.svg"
                              }
                              alt={c.status}
                              fill
                              unoptimized
                              className="object-contain"
                              draggable={false}
                            />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                          {c.status === "merged" ? "Merged" : "Open"}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <span className="font-semibold text-primary-foreground">
                    {c.repo}
                  </span>
                  <div className="text-secondary-foreground font-mono tracking-wide text-xs ml-1">
                    {c.title}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-secondary-foreground font-mono group-hover:text-primary-foreground transition-all">
                  <div className="text-xs">#{c.prId}</div>
                  <ArrowUpRight
                    size={16}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-xs font-mono text-secondary-foreground">
            No public contributions yet, but actively diving into open source.
          </div>
        )}
      </PanelContent>
    </Panel>
  );
}
