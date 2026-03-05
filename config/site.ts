import { USER } from "@/features/portfolio/profile/data/user";
import type { NavItem } from "@/types/nav";

export const SITE_INFO = {
  name: USER.displayName,
  url: "https://kaustubh.cloud",
  ogImage: USER.ogImage,
  description: USER.bio,
  keywords: USER.keywords,
};

export const META_THEME_COLORS = {
  dark: "#09090b",
};

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
  utm_source: "kaustubh.cloud",
  utm_medium: "portfolio_website",
  utm_campaign: "referral",
};
