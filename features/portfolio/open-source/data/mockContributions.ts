import { getContributions } from "@/lib/githubContributions";
import { Contribution } from "../types/osType";

export const mockContributions: Contribution[] = await getContributions();
