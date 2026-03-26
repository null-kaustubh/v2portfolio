import Link from "next/link";
import Image from "next/image";
import { ProjectTypes } from "../types/projectTypes";

type ProjectItemProps = {
  project: ProjectTypes;
};

const statusStyles = {
  live: "bg-green-500/10 text-green-600 border-green-500/40",
  "in development": "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  "on hiatus":
    "bg-secondary-foreground/10 text-secondary-foreground border-border",
};

export default function ProjectItemPortfolio({ project }: ProjectItemProps) {
  return (
    <div className="group flex flex-col border-border">
      {/* CLICKABLE PART */}
      <Link href={`/projects/${project.slug}`} className="group flex flex-col">
        {/* Image */}
        <div className="bg-border w-full aspect-[1.4/1] border-b border-border overflow-hidden transition-[filter] grayscale-75 group-hover:grayscale-0 duration-500">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
            draggable={false}
          />
        </div>

        {/* Footer (WITHOUT icons) */}
        <div className="py-2 px-4 mt-auto">
          {/* Title + status */}
          <div className="flex items-center gap-3 mt-2">
            <div className="max-w-50 sm:max-w-80 min-w-0">
              <div className="relative">
                <h3 className="truncate text-2xl">{project.title}</h3>
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-foreground transition-all duration-300 group-hover:w-full" />
              </div>
            </div>

            <span
              className={`
                text-xs font-mono uppercase
                border px-1 py-1 rounded-sm ${statusStyles[project.status]}`}
            >
              {project.status}
            </span>
          </div>
        </div>
      </Link>

      {/* NON-CLICKABLE PART (icons + tech inline) */}
      <div className="flex items-center justify-between gap-2 px-4 pb-4 min-w-0">
        {/* Tech (again, but inline with icons) */}
        <p className="text-xs sm:text-sm font-mono lowercase text-secondary-foreground truncate min-w-0 w-55 sm:w-85">
          [{project.tech.join(" · ")}]
        </p>

        <div className="flex items-center gap-2 shrink-0">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-selection transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M10 14.9993C9.34732 15.6987 8.98919 16.6227 9 17.5793V20.9993M14 14.9993C14.6527 15.6987 15.0108 16.6227 15 17.5793V20.9993M9 19.0493C8.10549 19.4055 7.13532 19.5294 6.18 19.4093C4.66 18.8893 5.06 17.5093 4.28 16.9393C3.90518 16.6713 3.46037 16.5184 3 16.4993M19 9.74927C19 12.7493 17.05 14.9993 12 14.9993C6.95 14.9993 5 12.7493 5 9.74927C4.9753 8.70844 5.20893 7.67772 5.68 6.74927C5.34 5.27927 5.47 3.46927 6.2 3.10927C6.93 2.74927 8.47 3.40927 9.74 4.25927C10.486 4.12615 11.2422 4.05922 12 4.05927C12.7572 4.05262 13.5134 4.11285 14.26 4.23927C15.53 3.38927 17.14 2.75927 17.8 3.08927C18.46 3.41927 18.66 5.25927 18.32 6.72927C18.7943 7.66371 19.028 8.70171 19 9.74927Z"
                  stroke="currentcolor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-selection transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M14.1213 9.87874L9.87868 14.1214M10.5858 6.3432L11.2929 5.6361C13.2455 3.68348 16.4113 3.68348 18.364 5.6361C20.3166 7.58872 20.3166 10.7545 18.364 12.7072L17.6569 13.4143M6.34314 10.5858L5.63604 11.293C3.68341 13.2456 3.68341 16.4114 5.63604 18.364C7.58866 20.3166 10.7545 20.3166 12.7071 18.364L13.4142 17.6569"
                  stroke="currentcolor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
