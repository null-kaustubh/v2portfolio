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
          <div className="divide-y divide-border/60">
            {contributions.map((c) => (
              <Link
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                key={c.id}
                className="relative px-2 py-3 flex flex-col sm:flex-row gap-2 sm:items-center justify-between group"
              >
                <div className="flex items-start sm:items-center gap-2 text-secondary-foreground">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="relative w-4 h-4 mt-0.5 sm:mt-0 shrink-0">
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
