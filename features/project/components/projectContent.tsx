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
import { resolveImage } from "@/lib/constants";

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
              <div className="relative overflow-hidden rounded-none ring-0 ring-secondary-foreground/20 sm:rounded-xl sm:ring-1">
                <Image
                  src={resolveImage(project.metadata.image)}
                  alt={project.metadata.title}
                  width={1200}
                  height={630}
                  loading="lazy"
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

                <div className="text-secondary-foreground text-xs sm:text-sm px-4 py-2 font-code flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <span className="whitespace-nowrap">Built with:</span>
                  <span>[{project.metadata.tech.join(" · ")}]</span>
                  <span className="whitespace-nowrap">and ❤︎</span>
                </div>
                <div className="text-secondary-foreground flex justify-between items-center text-sm px-4 py-2 screen-line-before">
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
                <div className="flex items-center justify-between screen-line-before">
                  <div className="px-4 flex gap-3">
                    {project.metadata.productHunt && (
                      <a
                        href={project.metadata.productHunt}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ph-btn hover:text-selection transition-colors relative overflow-hidden rounded-full"
                        style={{
                          display: "inline-flex",
                          position: "relative",
                          overflow: "hidden",
                          borderRadius: "50%",
                        }}
                      >
                        <style>{`
                          .ph-btn::after {
                            content: '';
                            position: absolute;
                            top: -50%;
                            left: -75%;
                            width: 50%;
                            height: 200%;
                            background: linear-gradient(
                              120deg,
                              transparent 0%,
                              rgba(255,255,255,0.55) 50%,
                              transparent 100%
                            );
                            transform: skewX(-20deg);
                            animation: ph-shine 2.8s ease-in-out infinite;
                          }
                          @keyframes ph-shine {
                            0%   { left: -75%; }
                            35%  { left: 125%; }
                            100% { left: 125%; }
                          }
                        `}</style>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 40 40"
                        >
                          <g fill="none" fillRule="evenodd">
                            <path
                              fill="#FF6154"
                              d="M40 20c0 11.046-8.954 20-20 20S0 31.046 0 20 8.954 0 20 0s20 8.954 20 20"
                            ></path>
                            <path
                              fill="#FFF"
                              d="M22.667 20H17v-6h5.667a3 3 0 0 1 0 6m0-10H13v20h4v-6h5.667a7 7 0 1 0 0-14"
                            ></path>
                          </g>
                        </svg>
                      </a>
                    )}
                    {project.metadata.githubUrl && (
                      <a
                        href={project.metadata.githubUrl}
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
                    {project.metadata.liveUrl && (
                      <a
                        href={project.metadata.liveUrl}
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
                  <div className="text-secondary-foreground flex items-center gap-3 text-sm px-4 py-2">
                    <div className="flex items-center gap-1">
                      <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        className="shrink-0 h-4 text-accent w-4"
                        fill="currentColor"
                      >
                        <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"></path>
                      </svg>
                      {project.github?.stats?.stars}
                    </div>
                    <div className="flex items-center gap-1">
                      <svg
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                        className="shrink-0 h-4 text-accent w-4"
                        fill="currentColor"
                      >
                        <path d="M19,2v6h2v5c0,1.103-0.897,2-2,2h-3c-0.732,0-1.409,0.212-2,0.556V8h2V2h-6v6h2v11v5h-2v6  h6v-6h-2v-5c0-1.103,0.897-2,2-2h3c2.206,0,4-1.794,4-4V8h2V2H19z M12,4h2v2h-2V4z M14,28h-2v-2h2V28z M23,6h-2V4h2V6z"></path>
                      </svg>
                      {project.github?.stats?.forks}
                    </div>
                    <div className="flex items-center gap-1">
                      <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        className="shrink-0 h-4 text-accent w-4"
                        fill="currentColor"
                      >
                        <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-.001 5.75c.69 0 1.251.56 1.251 1.25s-.561 1.25-1.251 1.25-1.249-.56-1.249-1.25.559-1.25 1.249-1.25zm2.001 12.25h-4v-1c.484-.179 1-.201 1-.735v-4.467c0-.534-.516-.618-1-.797v-1h3v6.265c0 .535.517.558 1 .735v.999z"></path>
                      </svg>
                      {project.github?.stats?.issues}
                    </div>
                    <div className="flex items-center gap-1">
                      <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        className="shrink-0 h-4 text-accent w-4"
                        fill="currentColor"
                      >
                        <path d="M12 9a3 3 0 0 0-3 3c0 1.642 1.358 3 3 3 1.641 0 3-1.358 3-3 0-1.642-1.359-3-3-3zm0 5c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm0-14C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.515 0-10-4.485-10-10S6.485 2 12 2s10 4.485 10 10-4.485 10-10 10z"></path>
                      </svg>
                      {project.github?.stats?.watchers}
                    </div>
                  </div>
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
