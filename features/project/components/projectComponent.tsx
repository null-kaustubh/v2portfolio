import Image from "next/image";
import type { ProjectPreview } from "../types/project";
import Link from "next/link";
import { formatFullDate } from "@/lib/formatDate";
import { cn } from "@/lib/utils";

type Props = {
  project: ProjectPreview;
  className?: string;
};

export default function ProjectItem({ project, className }: Props) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn("group flex flex-col", className)}
    >
      {/* Image container */}
      <div className="relative overflow-hidden bg-muted">
        {project.image && (
          <Image
            src={project.image}
            alt={project.title}
            width={1200}
            height={630}
            className="h-auto w-full object-contain border-b border-border"
            loading="lazy"
          />
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        {/* Tech */}
        {project.tech && (
          <div className="text-xs font-mono text-secondary-foreground">
            [{project.tech.join(", ")}]
          </div>
        )}
        {/* Title + Date */}
        <div className="flex items-center justify-between gap-4">
          <h3 className="sm:text-2xl text-xl font-medium truncate group-hover:underline underline-offset-3">
            {project.title}
          </h3>

          <span className="text-xs sm:text-sm font-mono text-secondary-foreground whitespace-nowrap">
            {formatFullDate(project.date, { shortMonth: true })}
          </span>
        </div>

        {/* Description */}
        <p className="line-clamp-2 font-mono text-xs sm:text-sm text-secondary-foreground">
          {project.description}
        </p>
      </div>
    </Link>
  );
}
