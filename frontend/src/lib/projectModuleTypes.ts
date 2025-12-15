import type { Difficulty, Category } from "./types";

// Project data type definition
export type ProjectType = {
  projectId: number;
  title: string;
  shortDescription: string;
  difficulty: Difficulty;
  category: Category;
  creatorId: number;
  lastUpdated: string;
  startingRepoLink?: string;
  detailsFile: Uint8Array | string;
  trackCount: number;
  submissionCount: number;
};
type InitialProjectTypeOmissions = "projectId" | "trackCount" | "submissionCount" | "lastUpdated";
export type InitialProjectType = Omit<ProjectType, InitialProjectTypeOmissions> & {
  recommendations?: InitialRecommendation[];
};

// Project tracking types
export type ProjectTrackingRecord = {
  userId: number;
  projectId: number;
  isTracking: boolean;
  isMarkedAsDone: boolean;
}

// Recommendation types
export type RecommendationType = {
  recommendationId: number;
  sourceId: number;
  targetId: number;
  sourceType: string;
  targetType: string;
}
export type InitialRecommendation = Omit<RecommendationType, "recommendationId">;

// Submission types
export type SubmissionType = {
  submissionId: number;
  projectId: number;
  creatorId: number;
  postedOn: string;
  lastUpdated: string;
  title: string;
  repoLink: string;
  rationaleFile?: Uint8Array | string;
}
type InitialSubmissionsOmits = "submissionId" | "lastUpdated" | "postedOn";
export type InitialSubmissionType = Omit<SubmissionType, InitialSubmissionsOmits>;
