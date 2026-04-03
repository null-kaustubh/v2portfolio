"use client";

import { useEffect, useState } from "react";
import { TocItem } from "@/lib/toc";
import { cn } from "@/lib/utils";

type Props = {
  items: TocItem[];
};

export default function TableOfContents({ items }: Props) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  // Track active heading
  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (!headings.length) return;

    // 👇 INITIAL ACTIVE SECTION (runs once)
    const setInitial = () => {
      for (const el of headings) {
        const rect = el.getBoundingClientRect();

        if (rect.top >= 0 && rect.top <= window.innerHeight * 0.6) {
          setActiveId(el.id);
          return;
        }
      }

      // fallback → first heading
      setActiveId(headings[0].id);
    };

    setInitial();

    // 👇 OBSERVER (same as before)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-40% 0px -55% 0px",
        threshold: [0.1, 0.5, 1],
      },
    );

    headings.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!target.closest("#toc-dock")) {
        setIsOpen(false);
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const activeItem = items.find((i) => i.id === activeId);
  const activeIndex = items.findIndex((i) => i.id === activeId);
  const total = items.length;

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 backdrop-blur-[3px]",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
      />

      <div
        id="toc-dock"
        className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2"
      >
        <div className="relative">
          {/* Expanded panel */}
          {isOpen && (
            <div
              className={cn(
                "absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-65 sm:w-80 z-50",
                "max-h-[50vh] overflow-y-auto",
                "rounded-2xl border border-white/10",
                "bg-background/20 backdrop-blur-xl",
                "shadow-[0_8px_32px_rgba(0,0,0,0.3)]",
                "p-4",
                "origin-bottom",
                isOpen
                  ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 scale-95 translate-y-2 pointer-events-none",
              )}
            >
              <p className="mb-2 text-sm font-mono uppercase text-foreground rounded-md">
                Table of Contents
              </p>

              <hr />

              <ul className="space-y-2 text-[15px] text-secondary-foreground pt-2">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className={cn(
                      item.level === 3 && "ml-4 text-secondary-foreground",
                    )}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "block hover:underline",
                        activeId === item.id &&
                          "text-foreground font-medium pl-1",
                      )}
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Dock button */}
          <div className="relative">
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className={cn(
                "flex items-center justify-center gap-2",
                "rounded-full border border-white/10",
                "bg-background/25 backdrop-blur-xl",
                "px-4 py-3 text-sm",
                "shadow-[0_4px_24px_rgba(0,0,0,0.25)]",
                "hover:bg-background/80 hover:shadow-[0_4px_28px_rgba(0,0,0,0.35)]",
                "cursor-pointer",
                "max-w-[80vw]",
              )}
            >
              <span className="text-secondary-foreground text-xs sm:text-md shrink-0 tabular-nums">
                {activeIndex >= 0 ? activeIndex + 1 : 1} / {total}
              </span>
              <span className="font-medium truncate max-w-37.5">
                {activeItem?.text || "Table of Contents"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
