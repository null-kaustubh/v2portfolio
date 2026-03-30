"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type Props = {
  stats?: {
    stars?: number;
    forks?: number;
    issues?: number;
    watchers?: number;
    license?: string | null;
  };
  languages?: { name: string; percentage: string }[];
};

const languageColors: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Go: "#00ADD8",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
};

export default function RepoStats({ stats, languages }: Props) {
  const [open, setOpen] = useState(true);

  return (
    <section className="border-b">
      {/* Header */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-4 py-3 text-left cursor-pointer"
      >
        <span className="font-bold text-xl sm:text-3xl">Repository Stats</span>
        <ChevronDown
          size={16}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Content */}
      {open && (
        <div className="px-4 pb-4 flex flex-col gap-4 sm:flex-row sm:gap-6">
          {/* Section 1: core stats */}
          <div className="grid grid-cols-2 w-[33%] gap-4 text-sm">
            <span>⭐ {stats?.stars ?? "-"}</span>
            <span>🍴 {stats?.forks ?? "-"}</span>
            <span>🐞 {stats?.issues ?? "-"}</span>
            <span>👀 {stats?.watchers ?? "-"}</span>
          </div>

          {/* Section 2: languages */}
          <div className="text-sm w-[33%] sm:max-w-xs">
            <div className="font-medium mb-2">Languages</div>

            {/* Bar */}
            <div className="h-3 w-full overflow-hidden rounded-xs bg-border flex">
              {languages?.map((lang) => (
                <div
                  key={lang.name}
                  className="h-full"
                  style={{
                    width: `${lang.percentage}%`,
                    backgroundColor: languageColors[lang.name] || "#888",
                  }}
                />
              ))}
            </div>

            {/* List */}
            <div className="mt-3 flex flex-col gap-1">
              {languages?.map((lang) => (
                <div
                  key={lang.name}
                  className="flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-sm"
                      style={{
                        backgroundColor: languageColors[lang.name] || "#888",
                      }}
                    />
                    <span>{lang.name}</span>
                  </div>
                  <span>{lang.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: license */}
          <div className="text-sm w-[33%]">
            <div className="font-medium mb-1">License</div>
            <span>{stats?.license ?? "-"}</span>
          </div>
        </div>
      )}
    </section>
  );
}
