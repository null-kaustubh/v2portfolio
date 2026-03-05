import { Contribution } from "@/features/portfolio/open-source/types/osType";

const USERNAME = "null-kaustubh";

export async function getContributions(): Promise<Contribution[]> {
  const res = await fetch(
    `https://api.github.com/search/issues?q=author:${USERNAME}+is:pr+-user:${USERNAME}+created:>=2026-01-01&per_page=10`,
    {
      headers: {
        Accept: "application/vnd.github+json",
      },
      next: { revalidate: 86400 }, // cache for 1 day
    },
  );

  const data: GithubSearchResponse = await res.json();

  return data.items.map((pr) => ({
    id: `${pr.repository_url}-${pr.number}`,
    repo: pr.repository_url.split("/").slice(-2).join("/"),
    title: pr.title,
    url: pr.html_url,
    prId: pr.number,
    status: pr.state === "open" ? "open" : "merged",
    type: "PR",
  }));
}

type GithubPullRequest = {
  number: number;
  title: string;
  html_url: string;
  state: "open" | "closed";
  repository_url: string;
};

type GithubSearchResponse = {
  items: GithubPullRequest[];
};
