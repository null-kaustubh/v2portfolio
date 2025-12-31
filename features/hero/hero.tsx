"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useState } from "react";

export default function Hero() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "flex grow items-center justify-center h-40 sm:h-60 select-none",
        "bg-white/0.75 bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)] bg-size-[10px_10px] bg-center [--pattern-foreground:var(--color-border)]/30",
      )}
    >
      <span
        className="
          absolute top-2 left-2
          sm:hidden
          text-[10px]
          text-muted-foreground/30
          font-mono
          select-none
        "
      >
        {open ? "tap again to close" : "tap to learn more"}
      </span>

      <motion.div
        className="relative inline-block cursor-help"
        initial="rest"
        animate={open ? "hover" : "rest"}
        whileHover="hover"
        onClick={() => setOpen((v) => !v)}
      >
        {/* Text */}
        <motion.span
          variants={{
            rest: {
              scale: 1,
              textShadow: "0px 0px 0px rgba(0,0,0,0)",
            },
            hover: {
              scale: 1.05,
              textShadow: "0px 0px 20px rgba(0,0,0,0.1)",
            },
          }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="text-center font-serif italic font-bold whitespace-nowrap
                       text-7xl sm:text-8xl md:text-9xl
                       text-muted-foreground/25 hover:text-foreground transition-colors duration-300"
        >
          侘寂
        </motion.span>

        {/* Tooltip */}
        <motion.div
          variants={{
            rest: {
              opacity: 0,
              y: 8,
              scale: 0.98,
              pointerEvents: "none",
            },
            hover: {
              opacity: 1,
              y: 0,
              scale: 1,
              pointerEvents: "auto",
            },
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute left-1/2 -translate-x-1/2 top-full mt-4 z-50 w-64 p-4 rounded-xl bg-background/90 border border-border/50 shadow-xl backdrop-blur-md"
        >
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-background/90 border-t border-l border-border/50 rotate-45 z-60 backdrop-blur-md" />

          <div className="flex flex-col gap-2 text-left">
            <div className="flex items-baseline justify-between border-b border-border/40 pb-2">
              <span className="text-2xl font-serif font-bold text-foreground">
                侘寂
              </span>
              <span className="font-mono text-sm italic text-muted-foreground">
                /wabi sabi/
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">
                noun
              </span>
              <p className="text-sm font-medium leading-relaxed text-foreground/90">
                Beauty in imperfection.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
