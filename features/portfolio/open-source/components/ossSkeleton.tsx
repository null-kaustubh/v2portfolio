import { Panel, PanelContent, PanelHeader, PanelTitle } from "@/features/panel";

export default function OpenSourceSkeleton() {
  return (
    <Panel id="open-source-skeleton">
      <PanelHeader>
        <PanelTitle>Open Source Contributions</PanelTitle>
      </PanelHeader>

      <PanelContent>
        <div className="divide-y divide-border/60">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="relative px-2 py-3 first:pt-2 flex flex-col sm:flex-row gap-2 sm:items-center justify-between"
            >
              {/* left side */}
              <div className="flex items-start sm:items-center gap-2">
                {/* icon */}
                <div className="w-4 h-4 rounded bg-muted animate-pulse mt-0.5 sm:mt-0 shrink-0" />

                {/* repo + title */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                  <div className="h-4 w-28 rounded bg-muted animate-pulse" />
                  <div className="h-4 w-40 rounded bg-muted animate-pulse mt-1 sm:mt-0" />
                </div>
              </div>

              {/* right side */}
              <div className="flex items-center gap-2 absolute right-3 top-3 sm:static">
                <div className="h-3 w-10 rounded bg-muted animate-pulse" />
                <div className="h-3 w-3 rounded bg-muted animate-pulse" />
              </div>
            </div>
          ))}

          {/* fake "see more" area */}
          <div className="pt-4 flex items-center justify-center">
            <div className="h-4 w-24 rounded bg-muted animate-pulse" />
          </div>
        </div>
      </PanelContent>
    </Panel>
  );
}
