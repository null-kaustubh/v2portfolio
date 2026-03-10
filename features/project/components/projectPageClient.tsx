"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import ProjectItem from "./projectComponent";
import { ProjectPreview } from "../types/project";

type Props = {
  projects: ProjectPreview[];
};

export default function ProjectPageClient({ projects }: Props) {
  const router = useRouter();

  return (
    <>
      <div className={`screen-line-after p-4 flex justify-between`}>
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-xs sm:text-sm font-mono text-secondary-foreground transition-opacity hover:opacity-70 cursor-pointer"
        >
          <ArrowLeft size={16} />
          <p className="sm:hidden block">home</p>
          <p className="sm:block hidden">back to home</p>
        </button>
      </div>

      <div className="relative min-h-[calc(100svh-12.5rem)]">
        <div className="absolute inset-0 z-10 pointer-events-none grid grid-cols-1 gap-8 max-sm:hidden sm:grid-cols-2">
          <div className="border-r border-border"></div>
          <div className="border-l border-border"></div>
        </div>

        <div className="h-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
          {projects.map((project) => {
            return (
              <ProjectItem
                key={project.slug}
                project={project}
                className={cn(
                  "screen-line-before-elevated",
                  "screen-line-after",
                )}
              />
            );
          })}
        </div>
        <div className="h-8" />
      </div>
    </>
  );
}
