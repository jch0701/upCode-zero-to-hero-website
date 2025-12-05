import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type SubmissionType = {
  submissionId: string;
  projectId: string;
  creator: string;
  postedOn: Date;
  lastUpdated: Date;
  title: string;
  tag: string;
  repoLink: string;
}

type InitialSubmissionsOmits = "submissionId" | "lastUpdated" | "postedOn";

export type InitialSubmissionType = Omit<SubmissionType, InitialSubmissionsOmits>;

interface SubmissionsSlice {
  submissionsList: Array<SubmissionType>;
}

const initialState: SubmissionsSlice = {
  submissionsList: [],
};

const dummyState: SubmissionsSlice = {
  submissionsList: [
    {
      submissionId: "1",
      projectId: "1",
      creator: "Alice",
      postedOn: new Date("2024-03-01"),
      lastUpdated: new Date("2024-03-05"),
      title: "AI Chatbot v1",
      tag: "Machine Learning",
      repoLink: "https://github.com/alice/ai-chatbot-v1",
    },
    {
      submissionId: "2",
      projectId: "2",
      creator: "Bob",
      postedOn: new Date("2024-03-10"),
      lastUpdated: new Date("2024-03-12"),
      title: "E-commerce Platform v1",
      tag: "Web Development",
      repoLink: "https://github.com/bob/e-commerce-platform-v1",
    },
  ],
};

let nextSubmissionId = 3;
function generateSubmissionId() {
  return (nextSubmissionId++).toString();
}

const submissionsSlice = createSlice({
  name: "submissions",
  initialState: dummyState,
  reducers: {
    addSubmission: (state, action: PayloadAction<InitialSubmissionType>) => {
      const newSubmission: SubmissionType = {
        ...action.payload,
        submissionId: generateSubmissionId(),
        postedOn: new Date(),
        lastUpdated: new Date(),
      };
      state.submissionsList.push(newSubmission);
    },
    // resubmit submission if update
    deleteSubmission: (state, action: PayloadAction<string>) => {
      state.submissionsList = state.submissionsList.filter(
        (submission) => submission.submissionId !== action.payload
      );
    },
  },
});

export const { addSubmission, deleteSubmission } = submissionsSlice.actions;
export default submissionsSlice.reducer;