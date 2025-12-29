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
      </div>
    </header>
  );
}
