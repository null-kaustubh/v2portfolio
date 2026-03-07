import { Panel, PanelContent, PanelHeader, PanelTitle } from "@/features/panel";

export default function BlogsSkeleton() {
  return (
    <Panel id="blogs-skeleton">
      <PanelHeader>
        <PanelTitle>Blogs</PanelTitle>
      </PanelHeader>

      <PanelContent className="p-0">
        <div className="flex flex-col">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-4 border-b border-border">
              {/* title + date row */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  {/* pin placeholder */}
                  <div className="w-4 h-4 rounded bg-muted animate-pulse" />

                  {/* title */}
                  <div className="h-5 w-48 sm:w-64 rounded bg-muted animate-pulse" />
                </div>

                {/* date */}
                <div className="h-3 w-20 rounded bg-muted animate-pulse hidden sm:block" />
              </div>

              {/* mobile date */}
              <div className="h-3 w-16 rounded bg-muted animate-pulse mt-2 sm:hidden" />

              {/* description */}
              <div className="mt-3 space-y-2">
                <div className="h-3 w-full rounded bg-muted animate-pulse" />
                <div className="h-3 w-4/5 rounded bg-muted animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        {/* view all blogs button */}
        <div className="p-4 flex items-center justify-center">
          <div className="h-4 w-32 rounded bg-muted animate-pulse" />
        </div>
      </PanelContent>
    </Panel>
  );
}
