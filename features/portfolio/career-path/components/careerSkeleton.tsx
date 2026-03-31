import { Panel, PanelContent, PanelHeader, PanelTitle } from "@/features/panel";

export default function CareerSkeleton() {
  return (
    <Panel id="career-skeleton">
      <PanelHeader>
        <PanelTitle>Career</PanelTitle>
      </PanelHeader>

      <PanelContent className="p-3 pt-1.5">
        <div>
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="py-3 rounded-xl px-4 my-1.5 bg-muted/35 border border-edge/30 border-dashed"
            >
              <div className="flex w-full items-start gap-3">
                {/* logo */}
                <div className="h-10 w-10 shrink-0 rounded-full bg-muted animate-pulse" />

                <div className="flex flex-1 flex-col gap-2">
                  {/* company + date */}
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-32 rounded bg-muted animate-pulse" />

                    <div className="ml-auto h-3 w-20 rounded bg-muted animate-pulse" />
                  </div>

                  {/* role */}
                  <div className="h-3 w-full sm:w-60 rounded bg-muted animate-pulse" />
                </div>
              </div>

              {/* description lines (don't need it for now) */}
              {/*<div className="mt-3 pl-13 space-y-2">
                <div className="h-3 w-11/12 rounded bg-muted animate-pulse" />
                <div className="h-3 w-3/4 rounded bg-muted animate-pulse" />
              </div>*/}
            </div>
          ))}
        </div>
      </PanelContent>
    </Panel>
  );
}
