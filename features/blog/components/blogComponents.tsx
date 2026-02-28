import Image from "next/image";
import React from "react";

import { CodeCopyButton } from "./codeCopyButton";

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
      className="rounded-lg ring-1 ring-secondary-foreground/20"
      {...props}
    />
  ),
  // Custom heading with better styling
  h1: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <h1
      className="mb-4 text-3xl font-bold leading-tight sm:text-4xl lg:mb-6 lg:text-5xl"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <h2
      className="mt-6 mb-4 first:mt-2 text-2xl font-semibold text-primary-foreground sm:text-3xl"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <h3 className="mt-4 mb-2 text-xl font-medium sm:text-2xl" {...props}>
      {children}
    </h3>
  ),
  // Custom paragraph styling
  p: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <p
      className="mb-4 text-base leading-7 text-secondary-foreground sm:text-lg sm:leading-8"
      {...props}
    >
      {children}
    </p>
  ),
  // Custom link styling
  a: ({
    href,
    children,
    ...props
  }: {
    href?: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className="font-medium text-primary-foreground underline underline-offset-4 hover:text-primary-foreground/80 transition-colors"
      {...props}
    >
      {children}
    </a>
  ),
  // Custom italic text styling
  em: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <em className="italic text-primary-foreground" {...props}>
      {children}
    </em>
  ),
  // Custom list styling
  ul: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <ul
      className="mb-4 ml-5 list-disc space-y-2 sm:ml-6 sm:space-y-2.5"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <ol
      className="mb-4 ml-5 list-decimal space-y-2 sm:ml-6 sm:space-y-2.5"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <li
      className="leading-7 text-secondary-foreground sm:text-lg sm:leading-8"
      {...props}
    >
      {children}
    </li>
  ),
  pre: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => {
    const getTextContent = (node: React.ReactNode): string => {
      if (typeof node === "string") {
        return node;
      }
      if (typeof node === "number") {
        return String(node);
      }
      if (
        React.isValidElement(node) &&
        node.props &&
        typeof node.props === "object"
      ) {
        return getTextContent(
          (node.props as { children?: React.ReactNode }).children,
        );
      }
      if (Array.isArray(node)) {
        return node.map(getTextContent).join("");
      }
      return "";
    };

    const codeText = getTextContent(children);

    return (
      <div className="group relative my-4 sm:my-6">
        <pre
          className="overflow-x-auto rounded-lg border bg-secondary-foreground/30 p-3 text-xs sm:p-4 sm:text-sm [&>code]:bg-transparent [&>code]:p-0"
          {...props}
        >
          {children}
        </pre>
        <CodeCopyButton code={codeText} />
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
    if (className?.includes("language-")) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }

    // Inline code styling
    return (
      <code
        className="rounded px-1.5 py-0.5 font-mono text-xs sm:px-2 sm:py-1 sm:text-sm"
        {...props}
      >
        {children}
      </code>
    );
  },
  // Custom blockquote styling
  blockquote: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <blockquote
      className="not-prose relative my-6 border-l-4 border-border pl-4 text-lg leading-relaxed italic text-primary-foreground sm:pl-5 sm:text-xl"
      {...props}
    >
      {children}
    </blockquote>
  ),
};
