"use client";
import Image from "next/image";
import type { ExperienceItem } from "../types/experienceType";
import { formatDateRange } from "@/lib/formatDate";
import { motion, AnimatePresence } from "motion/react";
import { useMediaQuery } from "@/hooks/use-media-query";

type Props = {
  item: ExperienceItem;
  isOpen: boolean;
  onHoverAction: () => void;
};

export function ExperienceRow({ item, isOpen, onHoverAction }: Props) {
  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <motion.div
      layout
      onMouseEnter={!isMobile ? onHoverAction : undefined}
      className={`group py-3 rounded-xl px-4 my-1.5 bg-muted/35 border border-edge/30 border-dashed cursor-default`}
      onClick={isMobile ? () => onHoverAction() : undefined}
      transition={{ layout: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } }}
    >
      <div className="flex w-full items-start gap-3">
        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted">
          <Image
            src={item.logo}
            alt={item.company}
            width={40}
            height={40}
            className="object-cover select-none"
            draggable={false}
          />
        </div>

        <div className="flex flex-1 flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <p className="font-medium text-md sm:text-lg leading-none lowercase">
                {item.company}
              </p>
            </div>

            <div className="ml-auto flex items-center gap-2 whitespace-nowrap text-[11px] sm:text-xs font-mono text-secondary-foreground">
              <span>
                {formatDateRange(item.from, item.to, item.status, {
                  shortMonth: isMobile,
                })}
              </span>

              {item.status === "active" && (
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
              )}
            </div>
          </div>

          <p className="w-full text-[11px] sm:text-xs font-mono text-secondary-foreground lowercase">
            {item.role}
            {item.employmentType && ` · ${item.employmentType}`}
          </p>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              duration: 0.35,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="overflow-hidden pl-13 sm:pl-13 text-sm sm:text-base text-secondary-foreground tracking-wide lowercase"
          >
            <ul className="mt-2 space-y-1">
              {item.description.map((point, i) => (
                <li key={i} className="flex gap-2">
                  <span className="select-none">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
