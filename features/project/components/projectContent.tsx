// import { Panel, PanelContent, PanelHeader, PanelTitle } from "@/features/panel";
import { formatFullDate } from "@/lib/formatDate";
import Image from "next/image";
import rehypeHighlight from "@shikijs/rehype";
import { MDXRemote } from "next-mdx-remote/rsc";
import { BlogComponents } from "@/features/blog/components/blogComponents";
import { Calendar, Clock, Clock1 } from "lucide-react";
import { Panel, PanelContent } from "@/features/panel";
import { calculateReadingTime } from "@/lib/readTime";
import { Toolbar } from "@/features/blog/components/Toolbar";
import { Project } from "@/features/project/types/project";
import { statusStyles } from "@/features/portfolio/projects/components/ProjectItem";
import RepoStats from "./repoStats";

type ProjectContentProps = {
  project: Project;
};

export default function ProjectContent({ project }: ProjectContentProps) {
  const readingTime = calculateReadingTime(project.content);
  return (
    <>
      <Toolbar url={getProjectUrl(project)} type="project" />

      <article className="mx-auto max-w-4xl">
        {/* Hero Section */}
        <header className="screen-line-before">
          {project.metadata.image && (
            <div className="p-px sm:p-4">
              <div className="relative overflow-hidden rounded-xl ring-0 ring-secondary-foreground/20 sm:ring-1">
                <Image
                  src={project.metadata.image}
                  alt={project.metadata.title}
                  width={1200}
                  height={630}
                  priority
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          )}
          <Panel>
            <PanelContent className="p-0">
              <div>
                <div className="flex flex-col justify-center">
                  <span
                    className={`
                      text-xs sm:text-sm font-mono uppercase w-fit
                      border px-1 py-1 rounded-sm mt-4 ml-4 ${statusStyles[project.metadata.status]}`}
                  >
                    {project.metadata.status}
                  </span>
                  <h1 className="px-4 pb-4 pt-1 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                    {project.metadata.title}
                  </h1>
                </div>

                <p className="text-secondary-foreground text-lg leading-relaxed screen-line-after screen-line-before p-4 lg:text-xl">
                  {project.metadata.description}
                </p>

                <div className="text-secondary-foreground flex justify-between items-center text-sm px-4 py-2">
                  <div className="flex flex-col sm:flex-row sm:items-center items-start sm:gap-4 gap-1">
                    <div className="flex items-center justify-center gap-1.5">
                      <Calendar size={16} />
                      <span>Created:</span>
                      <time dateTime={project.metadata.createdAt}>
                        {formatFullDate(project.metadata.createdAt)}
                      </time>
                    </div>
                    <div className="flex items-center justify-center gap-1.5">
                      <Clock1 size={16} />
                      <span>Updated:</span>
                      <time dateTime={project.metadata.updatedAt}>
                        {formatFullDate(project.metadata.updatedAt)}
                      </time>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-1.5">
                    <Clock size={16} />
                    {readingTime}m
                  </div>
                </div>
                <div className="text-secondary-foreground flex items-center text-sm px-4 py-2 screen-line-before">
                  <div>{project.github?.stats?.forks}</div>
                  <div>{project.github?.stats?.stars}</div>
                  <div>{project.github?.stats?.issues}</div>
                  <div>{project.github?.stats?.watchers}</div>
                  <div>{project.github?.stats?.license}</div>
                </div>
              </div>
            </PanelContent>
          </Panel>
        </header>

        {/* Content */}
        <div className="prose prose-neutral max-w-none pt-4 px-4">
          <MDXRemote
            source={project.content}
            components={BlogComponents}
            options={{
              mdxOptions: {
                rehypePlugins: [
                  [
                    rehypeHighlight,
                    {
                      themes: {
                        light: "one-light",
                        dark: "one-dark-pro",
                      },
                      defaultColor: false,
                    },
                  ],
                ],
              },
            }}
          />
        </div>
      </article>
    </>
  );
}

export function getProjectUrl(project: Project) {
  return `/projects/${project.slug}`;
}
