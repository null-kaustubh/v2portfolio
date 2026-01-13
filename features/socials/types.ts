import { ReactNode } from "react";

export type SocialLinkType =
  | "github"
  | "linkedin"
  | "twitter"
  | "leetcode"
  | "email"
  | "website";

export type Links = {
  title: string;
  url: string;
  type: SocialLinkType;
  icon: ReactNode;
};
