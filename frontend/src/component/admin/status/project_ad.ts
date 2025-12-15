import { store } from "@/store";

export function getProjectCount() {
  const state = store.getState();
  return state.projects.projectsList.length;
}

export function getSubmissionCount() {
  const state = store.getState();
  return state.submissions.submissionsList.length;
}