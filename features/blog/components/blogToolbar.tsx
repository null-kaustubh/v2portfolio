"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, Share } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AnimatePresence, motion } from "motion/react";

type ToolbarType = "blog" | "project";

interface BlogToolbarProps {
  url: string;
  type: ToolbarType;
}

export function BlogToolbar({ url, type }: BlogToolbarProps) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const route = type === "blog" ? "/blogs" : "/projects";
  const label = type === "blog" ? "all blogs" : "all projects";

  const absoluteUrl = url.startsWith("http")
    ? url
    : typeof window !== "undefined"
      ? new URL(url, window.location.origin).toString()
      : url;

  return (
    <>
      <div className="mx-auto flex max-w-4xl items-center justify-between p-4">
        <button
          onClick={() => router.push(route)}
          className="flex items-center gap-2 text-xs sm:text-sm font-mono text-secondary-foreground transition-opacity hover:opacity-70 cursor-pointer"
        >
          <ArrowLeft size={16} />
          {label}
        </button>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={async () => {
                const success = await copyText(absoluteUrl);
                if (!success) return;

                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="flex items-center gap-2 rounded-lg bg-border/50 p-1.5 text-sm text-secondary-foreground transition hover:opacity-70 hover:text-primary-foreground cursor-pointer"
            >
              <Share size={16} />
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>share this post</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-15 left-1/2 z-50 flex font-mono text-xs -translate-x-1/2 items-center justify-center gap-2 rounded-md border bg-background p-2 shadow-lg"
          >
            <CheckCircle2 size={16} className="text-success" />
            link copied
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export const copyText = async (text: string) => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    // Fallback for mobile browsers
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    textarea.style.top = "-9999px";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    const success = document.execCommand("copy");
    document.body.removeChild(textarea);
    return success;
  } catch {
    return false;
  }
};
