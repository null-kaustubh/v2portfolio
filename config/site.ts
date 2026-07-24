import { USER } from "@/features/portfolio/profile/data/user";
import type { NavItem } from "@/types/nav";

export const SITE_INFO = {
  name: USER.displayName,
  url: "https://1xkaustubh.com",
  ogImage: USER.ogImage,
  description: USER.bio,
  keywords: USER.keywords,
};

export const META_THEME_COLORS = {
  light: "#fafaf9",
  dark: "#09090b",
};

/**
 * Canonical profile URLs used for schema.org `sameAs`.
 * Keep in sync with `features/portfolio/socials/links.tsx` (which holds the
 * same URLs alongside JSX icons and so can't be imported from metadata code).
 */
export const SOCIAL_PROFILES = [
  "https://github.com/null-kaustubh",
  "https://www.linkedin.com/in/kaustubhsankhe/",
  "https://x.com/kaustubh_sankhe",
  "https://leetcode.com/u/nullkaustubh/",
  "https://in.pinterest.com/v0idzn/",
];

export const MAIN_NAV: NavItem[] = [
  {
    title: "nullfolio",
    href: "/",
  },
];

export const GITHUB_USERNAME = "null-kaustubh";
export const SOURCE_CODE_GITHUB_REPO = "null-kaustubh/v2portfolio.git";
export const SOURCE_CODE_GITHUB_URL =
  "https://github.com/null-kaustubh/v2portfolio.git";

export const UTM_PARAMS = {
  utm_source: "1xkaustubh.com",
  utm_medium: "portfolio_website",
  utm_campaign: "referral",
};
