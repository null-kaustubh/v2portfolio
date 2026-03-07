import { Panel, PanelContent, PanelHeader, PanelTitle } from "@/features/panel";

export default function SkillsSkeleton() {
  return (
    <Panel id="skills-skeleton">
      <PanelHeader className="flex items-center justify-between">
        <PanelTitle>Skills</PanelTitle>

        {/* fake sort button */}
        <div className="h-4 w-4 rounded bg-muted animate-pulse" />
      </PanelHeader>

      <PanelContent
        className="
          overflow-hidden
          bg-white/0.75
          bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)]
          bg-size-[10px_10px] bg-center
          [--pattern-foreground:var(--color-border)]/30
        "
      >
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 23 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-1.5 rounded-md border border-border bg-background px-2 py-1.5"
            >
              {/* icon */}
              <div className="h-4 w-4 rounded bg-muted animate-pulse" />

              {/* divider */}
              <div className="h-3 w-px bg-secondary-foreground/40" />

              {/* label */}
              <div className="h-3 w-14 rounded bg-muted animate-pulse" />
            </div>
          ))}
        </div>
      </PanelContent>
    </Panel>
  );
}
