import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { links } from "./links";
import { Panel } from "../../panel";

export default function SocialLinks() {
  return (
    <Panel id="socials" className="screen-line-before screen-line-after">
      <div className="p-4 font-mono text-sm text-secondary-foreground">
        {/* Mobile: icons only */}
        <div className="flex items-center justify-evenly gap-4 md:hidden">
          {links.map((link, id) => (
            <Link
              key={id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent-foreground transition-colors"
              aria-label={link.title}
            >
              {link.icon}
            </Link>
          ))}
        </div>

        {/* Desktop: title only */}
        <div
          className="hidden md:grid md:divide-x divide-edge"
          style={{ gridTemplateColumns: `repeat(${links.length}, 1fr)` }}
        >
          {links.map((link, id) => (
            <Link
              key={id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex items-center justify-between gap-2 px-1.5 py-2
                hover:underline underline-offset-4 hover:text-accent-foreground transition-[color] duration-200
                md:justify-center md:px-0
              "
            >
              <span>{link.title}</span>
              <ArrowUpRight size={18} />
            </Link>
          ))}
        </div>
      </div>
    </Panel>
  );
}
