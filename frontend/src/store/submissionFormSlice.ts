import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type SubmissionFormType = {
  title: string;
  repoLink: string;
  // tag should be dynamically generated preferably by calling from github api
  rationaleFile?: Uint8Array | string;
}

const initialState: SubmissionFormType = {
  title: "",
  repoLink: "",
  rationaleFile: "",
};

export const submissionFormSlice = createSlice({
  name: "submissionForm",
  initialState,
  reducers: {
    setSubmissionForm: (state, action: PayloadAction<SubmissionFormType>) => {
      return { ...state, ...action.payload };
    },
    resetSubmissionForm: () => {
      return initialState;
    },
  },
});

export const { setSubmissionForm, resetSubmissionForm } = submissionFormSlice.actions;
export default submissionFormSlice.reducer;