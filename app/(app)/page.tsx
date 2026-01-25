import dynamic from "next/dynamic";

import { Overview } from "@/features/overview/overview";
import { ProfileHeader } from "@/features/profile/components/profile-header";
import { USER } from "@/features/profile/data/user";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { ProfilePage as PageSchema, WithContext } from "schema-dts";
import SectionSkeleton from "@/components/skeleton";
import Hero from "@/features/hero/hero";

const Career = dynamic(
  () => import("@/features/career-path/components/career"),
  {
    loading: () => (
      <ContentWrapper>
        <SectionSkeleton />
      </ContentWrapper>
    ),
  },
);

const TechStack = dynamic(
  () =>
    import("@/features/techstack/components/techstack").then(
      (m) => m.TechStack,
    ),
  {
    loading: () => (
      <ContentWrapper>
        <SectionSkeleton />
      </ContentWrapper>
    ),
  },
);

const SocialLinks = dynamic(() => import("@/features/socials/SocialLinks"), {
  loading: () => (
    <ContentWrapper>
      <SectionSkeleton />
    </ContentWrapper>
  ),
});

const Projects = dynamic(
  () => import("@/features/projects/components/Projects"),
  {
    loading: () => (
      <ContentWrapper>
        <SectionSkeleton />
      </ContentWrapper>
    ),
  },
);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPageJsonLd()).replace(/</g, "\\u003c"),
        }}
      />

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

        <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-0 md:max-w-4xl lg:max-w-4xl">
          <ContentWrapper>
            <Hero />
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

          <ContentWrapper>
            <Projects />
          </ContentWrapper>
        </div>
      </div>

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

export function ContentWrapper({
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
