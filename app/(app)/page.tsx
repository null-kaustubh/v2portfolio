import dynamic from "next/dynamic";

import { Overview } from "@/features/portfolio/overview/overview";
import { ProfileHeader } from "@/features/portfolio/profile/components/profile-header";
import { USER } from "@/features/portfolio/profile/data/user";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { ProfilePage as PageSchema, WithContext } from "schema-dts";
import Hero from "@/features/portfolio/hero/hero";
import SocialLinksSkeleton from "@/features/portfolio/socials/socialSkeleton";
import CareerSkeleton from "@/features/portfolio/career-path/components/careerSkeleton";
import SkillsSkeleton from "@/features/portfolio/techstack/components/skillsSkeleton";
import OpenSourceSkeleton from "@/features/portfolio/open-source/components/ossSkeleton";
import ProjectsSkeleton from "@/features/portfolio/projects/components/projectsSkeleton";
import BlogsSkeleton from "@/features/portfolio/blogs/components/blogSkeleton";
import FooterSkeleton from "@/features/footer/components/footerSkeleton";

const SocialLinks = dynamic(
  () => import("@/features/portfolio/socials/SocialLinks"),
  {
    loading: () => (
      <ContentWrapper>
        <SocialLinksSkeleton />
      </ContentWrapper>
    ),
  },
);

const Career = dynamic(
  () => import("@/features/portfolio/career-path/components/career"),
  {
    loading: () => (
      <ContentWrapper>
        <CareerSkeleton />
      </ContentWrapper>
    ),
  },
);

const Skills = dynamic(
  () =>
    import("@/features/portfolio/techstack/components/skills").then(
      (m) => m.Skills,
    ),
  {
    loading: () => (
      <ContentWrapper>
        <SkillsSkeleton />
      </ContentWrapper>
    ),
  },
);

const OpenSource = dynamic(
  () => import("@/features/portfolio/open-source/components/opensource"),
  {
    loading: () => (
      <ContentWrapper>
        <OpenSourceSkeleton />
      </ContentWrapper>
    ),
  },
);

const Projects = dynamic(
  () => import("@/features/portfolio/projects/components/Projects"),
  {
    loading: () => (
      <ContentWrapper>
        <ProjectsSkeleton />
      </ContentWrapper>
    ),
  },
);

const Blogs = dynamic(
  () => import("@/features/portfolio/blogs/components/blog"),
  {
    loading: () => (
      <ContentWrapper>
        <BlogsSkeleton />
      </ContentWrapper>
    ),
  },
);

const Footer = dynamic(() => import("@/features/footer/components/footer"), {
  loading: () => (
    <ContentWrapper>
      <FooterSkeleton />
    </ContentWrapper>
  ),
});

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
            "bg-size-[10px_10px] [--pattern-foreground:var(--color-edge)]/30",
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
            <Skills />
          </ContentWrapper>

          <ContentWrapper>
            <OpenSource />
          </ContentWrapper>

          <ContentWrapper>
            <Projects />
          </ContentWrapper>

          <ContentWrapper>
            <Blogs />
          </ContentWrapper>

          <ContentWrapper>
            <Footer />
          </ContentWrapper>
        </div>
      </div>
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
