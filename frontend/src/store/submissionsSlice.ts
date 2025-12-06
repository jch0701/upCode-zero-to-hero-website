import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type SubmissionType = {
  submissionId: string;
  projectId: string;
  creatorId: string;
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
      creatorId: "1",
      postedOn: new Date("2024-03-01"),
      lastUpdated: new Date("2024-03-05"),
      title: "AI Chatbot v1",
      tag: "Machine Learning",
      repoLink: "https://github.com/xinsheng04/memory-card-game.git",
    },
    {
      submissionId: "2",
      projectId: "2",
      creatorId: "2",
      postedOn: new Date("2024-03-10"),
      lastUpdated: new Date("2024-03-12"),
      title: "E-commerce Platform v1",
      tag: "Web Development",
      repoLink: "https://github.com/kyle-bdvl/Notes-App.git",
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
    editSubmission: (state, action: PayloadAction<SubmissionType>) => {
      const index = state.submissionsList.findIndex(
        (submission) => submission.submissionId === action.payload.submissionId
      );
      if (index !== -1) {
        state.submissionsList[index] = {
          ...action.payload,
          lastUpdated: new Date(),
        };
      }
    },
    deleteSubmission: (state, action: PayloadAction<string>) => {
      state.submissionsList = state.submissionsList.filter(
        (submission) => submission.submissionId !== action.payload
      );
    },
  },
});

export const { addSubmission, deleteSubmission } = submissionsSlice.actions;
export default submissionsSlice.reducer;