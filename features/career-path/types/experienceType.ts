export type EmploymentType =
  | "fulltime"
  | "parttime"
  | "intern"
  | "freelance"
  | "contract"
  | null;

export type JobStatus = "active" | "ended";

export type YearMonth = `${number}-${number}` | null;

export interface ExperienceItem {
  company: string;
  logo: string;
  role: string;
  employmentType: EmploymentType;
  status: JobStatus;
  from: YearMonth;
  to: YearMonth;
  description: string;
}

export type ExperienceList = ExperienceItem[];
