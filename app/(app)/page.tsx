import { Overview } from "@/features/overview/overview";
import { ProfileHeader } from "@/features/profile/components/profile-header";
import { USER } from "@/features/profile/data/user";
import SocialLinks from "@/features/socials/SocialLinks";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import Link from "next/link";
import { ProfilePage as PageSchema, WithContext } from "schema-dts";

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPageJsonLd()).replace(/</g, "\\u003c"),
        }}
      />

      <TopBar />

      <div className="relative">
        {/* Side pattern layer */}
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-y-0 -left-[100vw] -right-[100vw] -z-10",
            "bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)]",
            "bg-[length:10px_10px] [--pattern-foreground:var(--color-edge)]/56"
          )}
        />

        <div className="relative z-10 mx-auto md:max-w-4xl lg:max-w-4xl">
          <ContentWrapper>
            <ProfileHeader />
          </ContentWrapper>

          <ContentWrapper>
            <Overview />
          </ContentWrapper>

          <ContentWrapper>
            <SocialLinks />
          </ContentWrapper>
        </div>
      </div>

      {/* <About /> */}

      {/* <TeckStack /> */}

      {/* <Blog /> */}

      {/* <Experiences /> */}

      {/* <Projects /> */}

      {/* <Awards /> */}

      {/* <Certifications /> */}

      {/* <Brand /> */}
    </>
  );
}

function getPageJsonLd(): WithContext<PageSchema> {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: dayjs(USER.dateCreated).toISOString(),
    dateModified: dayjs().toISOString(),
    mainEntity: {
      "@type": "Person",
      name: USER.displayName,
      identifier: USER.username,
      image: USER.avatar,
    },
  };
}

// function Separator({ className }: { className?: string }) {
//   return (
//     <div
//       className={cn("relative flex h-8 w-full border-x border-edge", className)}
//     />
//   );
// }

function ContentWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative z-10 border-x border-edge -mt-px first:mt-0 bg-background",
        className
      )}
    >
      {/* Top-left corner diamond */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-background border border-edge rotate-45 z-20" />

      {/* Top-right corner diamond */}
      <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-background border border-edge rotate-45 z-20" />

      {/* Bottom-left corner diamond */}
      <div className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-background border border-edge rotate-45 z-20 hidden last:block" />

      {/* Bottom-right corner diamond */}
      <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-2 h-2 bg-background border border-edge rotate-45 z-20 hidden last:block" />

      {children}
    </div>
  );
}

function TopBar() {
  return (
    <header className="relative w-full bg-background">
      {/* FULL-WIDTH BOTTOM BORDER */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-edge" />

      {/* CENTERED CONTENT */}
      <div className="relative mx-auto md:max-w-4xl lg:max-w-4xl border-x border-edge">
        <div className="flex h-10 items-center justify-between px-4 text-sm font-mono text-secondary-foreground">
          <Link href={"/"}>
            <span className="text-xl text-secondary-foreground tracking-wide">
              KS
            </span>
          </Link>

          <nav className="flex items-center gap-4">
            <a href="#overview" className="underline-offset-4 hover:underline">
              Overview
            </a>
            <a href="#projects" className="underline-offset-4 hover:underline">
              Projects
            </a>
            <a href="#contact" className="underline-offset-4 hover:underline">
              Contact
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
