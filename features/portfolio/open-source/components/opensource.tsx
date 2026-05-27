import { getContributions } from "@/lib/githubContributions";
import OpenSourceClient from "./opensource-client";

export default async function OpenSource() {
  const contributions = await getContributions();
  return <OpenSourceClient contributions={contributions} />;
}
