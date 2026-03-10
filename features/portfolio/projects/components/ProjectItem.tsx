import Link from "next/link";
import Image from "next/image";
import { ProjectPreview } from "@/features/project/types/project";

type ProjectItemProps = {
  project: ProjectPreview;
};

const statusStyles = {
  live: "bg-green-500/10 text-green-600 border-green-500/40",
  "in development": "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  "on hiatus":
    "bg-secondary-foreground/10 text-secondary-foreground border-border",
};

export default function ProjectItemPortfolio({ project }: ProjectItemProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col hover:cursor-pointer border-border"
    >
      {/* Image */}
      <div className="bg-border w-full aspect-[1.4/1] border-b border-border overflow-hidden transition-[color] grayscale-75 group-hover:grayscale-0 duration-500">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover filter: blur(20px); transition: filter 0.5s ease-out;"
          draggable={false}
        />
      </div>

      {/* Footer */}
      <div className="p-4 mt-auto">
        {/* Tech stack */}
        <p className="text-xs font-mono lowercase text-secondary-foreground">
          [{project.tech.join(" · ")}]
        </p>

        {/* Title + status */}
        <div className="flex items-center gap-3 mt-2">
          <h3 className="text-2xl relative w-fit">
            {project.title}
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-foreground transition-all duration-300 group-hover:w-full" />
          </h3>

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
  );
}
