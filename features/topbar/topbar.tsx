"use client";
import { ThemeContext } from "@/context/ThemeProvider";
import Link from "next/link";
import { useContext } from "react";

export default function TopBar() {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) return null;

  const { theme, handleChange } = themeContext;
  const isDark = theme === "dark";

  return (
    <header className="sticky top-0 z-20 h-12 bg-background border-b border-edge flex justify-center">
      <div className="relative mx-auto px-4 sm:px-6 lg:px-0 md:max-w-4xl lg:max-w-4xl w-full">
        <div className="relative h-full">
          {/* left diamond */}
          <div className="absolute left-0 -bottom-px -translate-x-[38%] translate-y-1/2 w-2 h-2 rotate-45 bg-background border border-edge z-20" />

          <div className="h-full border-x border-edge flex items-center justify-between px-4 font-mono text-sm text-secondary-foreground">
            <Link href={"/"}>
              <span className="text-xl text-secondary-foreground tracking-wide">
                KS
              </span>
            </Link>

            <button
              type="button"
              onClick={handleChange}
              className="p-1 transition-opacity hover:opacity-70 hover:cursor-pointer"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5 fill-secondary-foreground"
                  viewBox="0 0 24 24"
                >
                  <path d="m21,11v-1h1v-1h1v-2h-3v-1h-2v-2h-1V1h-2v1h-1v1h-1v1h-2v-1h-1v-1h-1v-1h-2v3h-1v2h-2v1H1v2h1v1h1v1h1v2h-1v1h-1v1h-1v2h3v1h2v2h1v3h2v-1h1v-1h1v-1h2v1h1v1h1v1h2v-3h1v-2h2v-1h3v-2h-1v-1h-1v-1h-1v-2h1Zm-2,2v1h1v1h1v1h-3v1h-1v1h-1v3h-1v-1h-1v-1h-1v-1h-2v1h-1v1h-1v1h-1v-3h-1v-1h-1v-1h-3v-1h1v-1h1v-1h1v-2h-1v-1h-1v-1h-1v-1h3v-1h1v-1h1v-3h1v1h1v1h1v1h2v-1h1v-1h1v-1h1v2h1v2h1v1h3v1h-1v1h-1v1h-1v2h1Z"></path>
                  <path d="m16,10v-1h-1v-1h-1v-1h-4v1h-1v1h-1v1h-1v4h1v1h1v1h1v1h4v-1h1v-1h1v-1h1v-4h-1Zm-1,4h-1v1h-4v-1h-1v-4h1v-1h4v1h1v4Z"></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5 fill-secondary"
                  viewBox="0 0 24 24"
                >
                  <path d="m21,17v1h-2v1h-4v-1h-2v-1h-2v-1h-1v-2h-1v-2h-1v-4h1v-2h1v-2h1v-1h2v-1h2v-1h-5v1h-2v1h-2v1h-1v1h-1v2h-1v2h-1v6h1v2h1v2h1v1h1v1h2v1h2v1h6v-1h2v-1h2v-1h1v-1h1v-2h-1Zm-13,3v-1h-2v-2h-1v-2h-1v-6h1v-2h1v-2h2v1h-1v2h-1v4h1v2h1v2h1v1h1v1h1v1h2v1h2v1h-5v-1h-2Z"></path>
                </svg>
              )}
            </button>
          </div>
          {/* right diamond */}
          <div className="absolute right-0 -bottom-px translate-x-[38%] translate-y-1/2 w-2 h-2 rotate-45 bg-background border border-edge z-20" />
        </div>
      </div>

      {/* gradient shadow */}
      <div className="pointer-events-none absolute top-[calc(100%+1px)] left-0 right-0 px-4 sm:px-6 md:px-0">
        <div className="mx-auto md:max-w-4xl lg:max-w-4xl h-[40px] blur-gradient-top" />
      </div>

      {/*<div className="absolute top-12 w-5/6 md:w-3/4 lg:w-1/2 h-[40px] pointer-events-none blur-gradient-top" />*/}
    </header>
  );
}
