import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";

export const BlogComponents = {
  // Override default image component
  img: ({
    src,
    alt,
    ...props
  }: {
    src: string;
    alt: string;
    [key: string]: unknown;
  }) => (
    <Image
      src={src}
      alt={alt}
      width={800}
      height={400}
      loading="lazy"
      className="rounded-lg ring-1 ring-secondary-foreground/20"
      {...props}
    />
  ),
  // Custom heading with better styling
  h1: ({
    children,
    className,
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
    [key: string]: unknown;
  }) => (
    <h1
      className={cn(
        "mb-4 text-3xl font-bold leading-tight sm:text-4xl lg:mb-6 lg:text-5xl",
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({
    children,
    className,
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
    [key: string]: unknown;
  }) => {
    const text = String(children);
    const id = slugify(text);

    return (
      <h2
        id={id}
        className={cn(
          "mt-6 mb-4 first:mt-2 text-2xl font-semibold text-primary-foreground sm:text-3xl",
          className,
        )}
        {...props}
      >
        {children}
      </h2>
    );
  },
  h3: ({
    children,
    className,
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
    [key: string]: unknown;
  }) => {
    const text = String(children);
    const id = slugify(text);

    return (
      <h3
        id={id}
        className={cn("mt-4 mb-2 text-xl font-medium sm:text-2xl", className)}
        {...props}
      >
        {children}
      </h3>
    );
  },
  // Custom paragraph styling
  p: ({
    children,
    className,
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
    [key: string]: unknown;
  }) => (
    <p
      className={cn(
        "mb-4 text-base leading-7 text-secondary-foreground sm:text-lg sm:leading-8",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  ),
  // Custom link styling
  a: ({
    href,
    children,
    className,
    ...props
  }: {
    href?: string;
    children: React.ReactNode;
    className?: string;
    [key: string]: unknown;
  }) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className={cn(
        "font-medium text-primary-foreground underline underline-offset-4 hover:text-primary-foreground/80 transition-colors",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  ),
  // Custom italic text styling
  em: ({
    children,
    className,
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
    [key: string]: unknown;
  }) => (
    <em className={cn("italic text-primary-foreground", className)} {...props}>
      {children}
    </em>
  ),
  // Custom list styling
  ul: ({
    children,
    className,
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
    [key: string]: unknown;
  }) => (
    <ul
      className={cn(
        "mb-4 ml-5 list-disc space-y-2 sm:ml-6 sm:space-y-2.5",
        className,
      )}
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({
    children,
    className,
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
    [key: string]: unknown;
  }) => (
    <ol
      className={cn(
        "mb-4 ml-5 list-decimal space-y-2 sm:ml-6 sm:space-y-2.5",
        className,
      )}
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({
    children,
    className,
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
    [key: string]: unknown;
  }) => (
    <li
      className={cn(
        "leading-7 text-secondary-foreground sm:text-lg sm:leading-8",
        className,
      )}
      {...props}
    >
      {children}
    </li>
  ),
  pre: ({
    children,
    className,
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
    [key: string]: unknown;
  }) => {
    return (
      <div className="not-prose group relative my-4 sm:my-6">
        <pre
          className={cn(
            "overflow-x-auto rounded-lg py-3 pr-10 pl-3 text-xs sm:text-sm font-code",
            className,
          )}
          {...props}
        >
          {/* Reset any code styling Shiki applies */}
          <div className="[&>code]:rounded-none [&>code]:p-0 [&>code]:bg-transparent">
            {children}
          </div>
        </pre>
      </div>
    );
  },
  // Inline code styling (not affected by syntax highlighting)
  code: ({
    children,
    className,
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
    [key: string]: unknown;
  }) => {
    // If it's part of a pre block (syntax highlighted), don't apply inline styling
    const isBlock =
      className?.includes("shiki") || typeof children === "object";
    if (isBlock) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }

    // Inline code styling
    return (
      <span className="bg-muted rounded-sm">
        <code
          className="px-1.5 py-0.5 font-mono text-xs sm:px-2 sm:py-1 sm:text-sm"
          {...props}
        >
          {children}
        </code>
      </span>
    );
  },
  // Custom blockquote styling
  blockquote: ({
    children,
    className,
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
    [key: string]: unknown;
  }) => (
    <blockquote
      className={cn(
        "not-prose relative my-6 border-l-4 border-border pl-4 text-lg leading-relaxed italic text-primary-foreground sm:pl-5 sm:text-xl",
        className,
      )}
      {...props}
    >
      {children}
    </blockquote>
  ),
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
