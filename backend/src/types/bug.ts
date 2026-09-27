// types/bug.ts

export type BugStatus = "OPEN" | "IN_PROGRESS" | "DONE" | "CANCELED";
export type BugPriority = "LOW" | "MEDIUM" | "HIGH";

export interface Bug {
  id: number;
  title: string;
  description: string;
  priority?: BugPriority;
  status?: BugStatus;
  createdAt: Date;
}
