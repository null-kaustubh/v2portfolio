import { Overview } from "@/features/overview/overview";
import { ProfileHeader } from "@/features/profile/components/profile-header";
import { USER } from "@/features/profile/data/user";
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

      <div className="mx-auto md:max-w-3xl">
        {/* <ProfileCover /> */}
        <DiffSeparator />
        <ProfileHeader />
        <Separator />

        <Overview />
        <Separator />

        {/* <SocialLinks /> */}
        <Separator />

        {/* <About /> */}
        <Separator />

        {/* <GitHubContributions /> */}
        <Separator />

        {/* <TeckStack /> */}
        <Separator />

        {/* <Blog /> */}
        <Separator />

        {/* <Experiences /> */}
        <Separator />

        {/* <Projects /> */}
        <Separator />

        {/* <Awards /> */}
        <Separator />

        {/* <Certifications /> */}
        <Separator />

        {/* <Brand /> */}
        <Separator />
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

function Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-8 w-full border-x border-edge",
        "before:absolute before:-left-[100vw] before:-z-1 before:h-8 before:w-[200vw]",
        "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56",
        className
      )}
    />
  );
}

function DiffSeparator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen h-12 select-none",
        "flex items-center justify-center",
        "border-t border-b border-edge",
        className
      )}
    >
      <div className="mx-auto md:max-w-3xl w-full border-x border-edge h-full pointer-events-none" />
    </div>
  );
}
