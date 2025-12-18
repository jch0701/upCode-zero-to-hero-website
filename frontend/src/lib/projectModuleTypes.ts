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
  detailsFile: string;
  trackCount: number;
  submissionCount: number;
};

type InitialProjectTypeOmissions = "projectId" | "trackCount" | "submissionCount" | "lastUpdated";

export type ExtendedProjectType = Omit<ProjectType, InitialProjectTypeOmissions> & {
  recommendations?: {targetId: number; targetType: string}[];
};

type LinkTypes = "roadmap" | "project" | "career";

// Recommendation types
export type RecommendationType = {
  recommendationId: number;
  sourceId: number;
  targetId: number;
  sourceType: LinkTypes;
  targetType: LinkTypes;
}
export type InitialRecommendation = Omit<RecommendationType, "recommendationId">;

// Project tracking types
export type ProjectTrackingRecord = {
  userId: number;
  projectId: number;
  isTracking: boolean;
  isMarkedAsDone: boolean;
}


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
