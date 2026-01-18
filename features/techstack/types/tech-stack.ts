export type TechGroup =
  | "frontend"
  | "backend"
  | "database"
  | "language"
  | "architecture"
  | "devops"
  | "tooling"
  | "cloud";

export interface TechStackType {
  /** Unique identifier used to resolve icon files. */
  key: string;
  /** Display name of the technology. */
  title: string;
  /** Category tags used for grouping/filtering. */
  categories: string[];
  /** Themed true if icon has light and dark mode variants */
  themed: boolean;
  /** Grouping of the technology */
  group: TechGroup;
}
