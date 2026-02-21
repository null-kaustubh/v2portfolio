import { Panel, PanelContent } from "@/features/panel";
import { USER } from "@/features/portfolio/profile/data/user";
import Views from "@/hooks/views";

export default function Footer() {
  return (
    <Panel id="footer">
      <PanelContent>
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-3 py-6 text-sm text-secondary-foreground md:flex-row">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="text-selection font-bold tracking-tight">
              {USER.displayName}
            </span>
          </p>

          <Views />
        </div>
      </PanelContent>
    </Panel>
  );
}
