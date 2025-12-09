import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type SubmissionType = {
  submissionId: number;
  projectId: number;
  creatorId: number;
  postedOn: string;
  lastUpdated: string;
  title: string;
  repoLink: string;
  // tag should be dynamically generated preferably by calling from github api
  rationaleFile?: Uint8Array | string;
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
      submissionId: 1,
      projectId: 1,
      creatorId: 1,
      postedOn: new Date("2024-03-01").toISOString(),
      lastUpdated: new Date("2024-03-05").toISOString(),
      title: "AI Chatbot v1",
      repoLink: "https://github.com/xinsheng04/memory-card-game.git",
    },
    {
      submissionId: 2,
      projectId: 2,
      creatorId: 2,
      postedOn: new Date("2024-03-10").toISOString(),
      lastUpdated: new Date("2024-03-12").toISOString(),
      title: "E-commerce Platform v1",
      repoLink: "https://github.com/kyle-bdvl/Notes-App.git",
    },
  ],
};

let nextSubmissionId = 3;
function generateSubmissionId() {
  return nextSubmissionId++;
}

const submissionsSlice = createSlice({
  name: "submissions",
  initialState: dummyState,
  reducers: {
    addSubmission: (state, action: PayloadAction<InitialSubmissionType>) => {
      const newSubmission: SubmissionType = {
        ...action.payload,
        projectId: Number(action.payload.projectId),  // Ensure it's a number
        creatorId: Number(action.payload.creatorId),  // Ensure it's a number
        submissionId: generateSubmissionId(),
        postedOn: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
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
          lastUpdated: new Date().toISOString(),
        };
      }
    },
    deleteSubmission: (state, action: PayloadAction<number>) => {
      state.submissionsList = state.submissionsList.filter(
        (submission) => submission.submissionId !== action.payload
      );
    },
  },
});

export const { addSubmission, editSubmission, deleteSubmission } = submissionsSlice.actions;
export default submissionsSlice.reducer;