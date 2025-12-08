"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

export default function TopBar() {
  const [isRecruiterMode, setIsRecruiterMode] = useState(false);

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

          <nav className="flex items-center justify-center">
            <button
              type="button"
              onClick={() => setIsRecruiterMode((p) => !p)}
              className={cn(
                "relative flex items-center",
                "rounded-full border-[0.5px] border-border bg-muted",
                "h-7.5 min-w-[260px] cursor-pointer"
              )}
            >
              {/* Sliding background */}
              <span
                aria-hidden
                className={cn(
                  "absolute inset-y-0 left-0",
                  "w-1/2 rounded-full bg-selection",
                  "transition-transform duration-300 ease-out",
                  isRecruiterMode ? "translate-x-full" : "translate-x-0"
                )}
              />

              {/* Labels */}
              <span className="relative z-10 flex items-center justify-center w-[280px]">
                <span
                  className={cn(
                    "flex-1 py-2 px-4 text-xs transition-all duration-200",
                    "rounded-full text-center whitespace-nowrap",
                    !isRecruiterMode
                      ? "text-selection-foreground"
                      : "text-secondary-foreground"
                  )}
                  aria-pressed={!isRecruiterMode}
                >
                  Builder Mode
                </span>
                <span
                  className={cn(
                    "flex-1 py-2 px-4 text-xs transition-all duration-200",
                    "rounded-full text-center whitespace-nowrap",
                    isRecruiterMode
                      ? "text-selection-foreground"
                      : "text-secondary-foreground"
                  )}
                  aria-pressed={isRecruiterMode}
                >
                  Recruiter Mode
                </span>
              </span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
