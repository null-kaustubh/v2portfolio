import { Panel, PanelContent, PanelHeader, PanelTitle } from "@/features/panel";

export default function ProjectsSkeleton() {
  return (
    <Panel id="projects-skeleton">
      <PanelHeader>
        <PanelTitle>Projects</PanelTitle>
      </PanelHeader>

      <PanelContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="border-b border-border md:odd:border-r">
              <div className="flex flex-col">
                {/* image placeholder */}
                <div className="w-full aspect-[1.4/1] border-b border-border bg-muted animate-pulse" />

                <div className="p-4">
                  {/* tech stack */}
                  <div className="h-3 w-40 rounded bg-muted animate-pulse" />

                  {/* title + status */}
                  <div className="flex items-center gap-3 mt-3">
                    <div className="h-6 w-32 rounded bg-muted animate-pulse" />
                    <div className="h-5 w-16 rounded bg-muted animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* view all button skeleton */}
        <div className="p-4 flex items-center justify-center">
          <div className="h-4 w-36 rounded bg-muted animate-pulse" />
        </div>
      </PanelContent>
    </Panel>
  );
}
