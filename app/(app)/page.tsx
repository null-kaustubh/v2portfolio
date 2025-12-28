import Career from "@/features/career-path/components/career";
import { Overview } from "@/features/overview/overview";
import { ProfileHeader } from "@/features/profile/components/profile-header";
import { USER } from "@/features/profile/data/user";
import SocialLinks from "@/features/socials/SocialLinks";
import { TechStack } from "@/features/techstack/components/techstack";
import TopBar from "@/features/topbar/topbar";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
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
            "bg-[length:10px_10px] [--pattern-foreground:var(--color-edge)]/30",
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

          <ContentWrapper>
            <Career />
          </ContentWrapper>

          <ContentWrapper>
            <TechStack />
          </ContentWrapper>
        </div>
      </div>
      {/* <Projects /> */}

      {/* <Awards /> */}

      {/* <Certifications /> */}
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
        className,
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
