import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { ContentWrapper } from "@/app/(app)/page";
import Footer from "@/features/footer/components/footer";

export function NotFound({ className }: { className?: string }) {
  return (
    <>
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
            <div
              className={cn(
                "flex h-[calc(100svh-9.3rem)] flex-col items-center justify-center",
                className,
              )}
            >
              <h1 className="mb-6 text-8xl font-medium tracking-tighter tabular-nums">
                404
              </h1>

              <div className="bg-muted/60 hover:bg-muted p-3 rounded-md cursor-pointer motion-safe:hover:transition-colors motion-safe:hover:duration-300">
                <Link
                  href="/"
                  className="flex gap-2 items-center justify-center"
                >
                  Go to Home
                  <ArrowRightIcon size={16} />
                </Link>
              </div>
            </div>
            <Footer />
          </ContentWrapper>
        </div>
      </div>
    </>
  );
}
