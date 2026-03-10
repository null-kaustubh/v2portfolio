import { ProjectStatus } from "@/features/portfolio/projects/types/projectTypes";

export type ProjectMetadata = {
  title: string;
  description: string;
  /**
   * Social/OG image URL for the post.
   * Use an absolute URL or a path under /public. Recommended size: 1200x630.
   */
  image: string;
  /**
   * Post creation date as an ISO date string (e.g. YYYY-MM-DD). Used for sorting.
   */
  createdAt: string;
  /**
   * Last updated date as an ISO date string (e.g. YYYY-MM-DD).
   */
  updatedAt: string;
  /**
   * Status of the project, LIVE, IN DEVELOPMENT, ON HIATUS.
   */
  status: ProjectStatus;
  /**
   * Technologies used in the project.
   */
  tech: string[];
};

export type Project = {
  /** Parsed frontmatter metadata from the MDX file. */
  metadata: ProjectMetadata;
  /** Slug derived from the MDX filename (without extension). */
  slug: string;
  /** MDX content body without frontmatter. */
  content: string;
};

/**
 * Minimal post data for client components that don't need the full content.
 * Reduces serialization overhead and bundle size.
 */
export type ProjectPreview = {
  slug: string;
  title: string;
  description: string;
  status: ProjectStatus;
  tech: string[];
  date: string;
  image: string;
};
