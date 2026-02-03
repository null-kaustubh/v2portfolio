import { Panel, PanelContent } from "@/features/panel";
import { USER } from "@/features/profile/data/user";
// import Views from "@/hooks/views";

export default function Footer() {
  return (
    <Panel>
      <PanelContent>
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-3 py-6 text-sm text-secondary-foreground md:flex-row">
          <p>
            © {new Date().getFullYear()} {USER.displayName}
          </p>

          <p className="hidden md:block">
            Built with Next.js, TypeScript & caffeine
          </p>

          {/*<Views />*/}
        </div>
      </PanelContent>
    </Panel>
  );
}
