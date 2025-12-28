import { Panel } from "@/features/panel";

export default function SectionSkeleton() {
  return (
    <Panel>
      <div className="p-6 space-y-4 animate-pulse">
        {/* section title */}
        <div className="h-5 w-36 rounded bg-muted" />

        {/* paragraph lines */}
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-5/6 rounded bg-muted" />
          <div className="h-4 w-2/3 rounded bg-muted" />
        </div>
      </div>
    </Panel>
  );
}
