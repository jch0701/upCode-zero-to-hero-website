import { createSlice } from "@reduxjs/toolkit";
import type { Difficulty, Category } from "../lib/types";
import type { PayloadAction } from "@reduxjs/toolkit";

export type ProjectFormType = {
  title: string;
  shortDescription: string;
  difficulty: Difficulty | "";
  category: Category | "";
  startingRepoLink?: string;
  detailsFile: Uint8Array | string;
}

const initialState: ProjectFormType = {
  title: "",
  shortDescription: "",
  difficulty: "",
  category: "",
  startingRepoLink: "",
  detailsFile: "",
};

export const projectFormSlice = createSlice({
  name: "projectForm",
  initialState,
  reducers: {
    setProjectForm: (state, action: PayloadAction<ProjectFormType>) => {
      return { ...state, ...action.payload };
    },
    resetProjectForm: () => {
      return initialState;
    },
  },
});

export const { setProjectForm, resetProjectForm } = projectFormSlice.actions;
export default projectFormSlice.reducer;