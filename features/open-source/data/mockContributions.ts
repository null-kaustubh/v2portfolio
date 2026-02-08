import { Contribution } from "../types/osType";

export const mockContributions: Contribution[] = [
  {
    id: "1",
    repo: "vercel/next.js",
    title: "Fix: edge case in dynamic route params",
    url: "https://github.com/vercel/next.js/pull/12345",
    prId: 12345,
    status: "merged",
    type: "PR",
  },
  {
    id: "2",
    repo: "shadcn/ui",
    title: "Add loading state to Button component",
    url: "https://github.com/shadcn/ui/pull/678",
    prId: 678,
    status: "open",
    type: "PR",
  },
];
