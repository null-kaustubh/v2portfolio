export type Contribution = {
  id: string;
  repo: string;
  title: string;
  url: string;
  prId: number;
  status: "merged" | "open";
  type: "PR" | "MR";
};
