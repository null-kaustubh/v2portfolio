export type TechStack = {
  /** Unique identifier used to resolve icon files. */
  key: string;
  /** Display name of the technology. */
  title: string;
  /** Category tags used for grouping/filtering. */
  categories: string[];
  /** Themed true if icon has light and dark mode variants */
  themed: boolean;
};
