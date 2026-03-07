import { Panel, PanelContent } from "@/features/panel";

export default function FooterSkeleton() {
  return (
    <Panel id="footer-skeleton">
      <PanelContent>
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-3 py-6 md:flex-row">
          {/* copyright */}
          <div className="h-4 w-40 rounded bg-muted animate-pulse" />

          {/* views */}
          <div className="h-4 w-24 rounded bg-muted animate-pulse" />
        </div>
      </PanelContent>
    </Panel>
  );
}
