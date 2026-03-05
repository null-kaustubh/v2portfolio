"use client";

import { ArrowUpIcon } from "lucide-react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

import { cn } from "@/lib/utils";

export function ScrollTop({
  className,
  ...props
}: React.ComponentProps<"button">) {
  const { scrollY } = useScroll();

  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latestValue) => {
    const shouldBeVisible = latestValue >= 400;
    setVisible((prev) => {
      if (prev === shouldBeVisible) return prev;
      return shouldBeVisible;
    });
  });

  return (
    <button
      data-visible={visible}
      className={cn(
        "[--bottom:1.5rem] lg:[--bottom:2.5rem]",
        "group fixed right-4 bottom-[calc(var(--bottom,1rem)+env(safe-area-inset-bottom,0px))] z-50 lg:right-8",
        "h-9 w-9",
        "flex items-center justify-center",
        "rounded-sm bg-accent-foreground/70 text-selection-foreground shadow-lg",
        "ring-1 ring-border ring-offset-3 ring-offset-background",
        "data-[visible=true]:opacity-100",
        "data-[visible=false]:opacity-0",
        "cursor-pointer hover:bg-accent-foreground/90",
        className,
      )}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      {...props}
    >
      <ArrowUpIcon className="size-5" />
      <span className="sr-only">Scroll to top</span>
    </button>
  );
}
