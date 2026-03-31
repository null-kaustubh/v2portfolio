import { Panel } from "../../panel";

export default function SocialLinksSkeleton() {
  return (
    <Panel
      id="socials-skeleton"
      className="screen-line-before screen-line-after"
    >
      <div className="p-4 font-mono text-sm">
        {/* Mobile skeleton */}
        <div className="flex items-center justify-evenly gap-4 md:hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-5 w-5 rounded-md bg-muted animate-pulse"
            />
          ))}
        </div>

        {/* Desktop skeleton */}
        <div
          className="hidden md:grid md:divide-x divide-edge"
          style={{ gridTemplateColumns: `repeat(6, 1fr)` }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-center gap-2 px-1.5 py-2"
            >
              <div className="h-4 w-16 rounded bg-muted animate-pulse" />
              <div className="h-4 w-4 rounded bg-muted animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}
