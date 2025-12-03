import { createSlice } from "@reduxjs/toolkit";
import type { Difficulty, Category } from "../lib/types";
import type { PayloadAction } from "@reduxjs/toolkit";

export type ProjectType = {
  projectId: string;
  title: string;
  shortDescription: string;
  difficulty: Difficulty;
  category: Category;
  creator: string;
  lastUpdated: Date;
  startingRepoLink?: string;
  details: string;
  trackCount: number;
  submissionCount: number;
}

type InitialProjectTypeOmissions = "projectId" | "trackCount" | "submissionCount" | "lastUpdated";

export type InitialProjectType = Omit<ProjectType, InitialProjectTypeOmissions>;

interface ProjectSlice{
  projectsList: Array<ProjectType>;
}

let nextProjectId = 4;
function generateProjectId() {
  return (nextProjectId++).toString();
}

const initialState: ProjectSlice = {
  projectsList: [],
};

const dummyState: ProjectSlice = {
  projectsList: [
    {
      projectId: "1",
      title: "AI-Powered Chatbot",
      shortDescription: "A chatbot that uses AI to provide customer support.",
      category: "Machine Learning",
      creator: "Alice",
      difficulty: "Intermediate",
      lastUpdated: new Date("2024-01-15"),
      startingRepoLink: "https://github.com/alice/ai-chatbot",
      details: "This project involves building a chatbot that leverages natural language processing and machine learning to provide real-time customer support.",
      trackCount: 5,
      submissionCount: 12
    },
    {
      projectId: "2",
      title: "E-commerce Website",
      shortDescription: "A full-featured e-commerce platform for online shopping.",
      category: "Web Development",
      creator: "Bob",
      difficulty: "Advanced",
      lastUpdated: new Date("2024-02-10"),
      startingRepoLink: "https://github.com/bob/ecommerce-website",
      details: "This project involves developing a comprehensive e-commerce platform with features like product listings, shopping cart, and payment integration.",
      trackCount: 8,
      submissionCount: 20
    },
    {
      projectId: "3",
      title: "Fitness Tracker App",
      shortDescription: "A mobile app to track fitness activities and health metrics.",
      category: "Mobile Apps",
      creator: "Charlie",
      difficulty: "Beginner",
      lastUpdated: new Date("2024-03-05"),
      startingRepoLink: "https://github.com/charlie/fitness-tracker-app",
      details: "This project involves creating a mobile app that helps users track their fitness activities and monitor health metrics such as heart rate, steps, and calories burned.",
      trackCount: 20,
      submissionCount: 30
    }
  ]
};

const projectsSlice = createSlice({
  name: "projects",
  initialState: dummyState,
  reducers: {
    setProject: (state, action: PayloadAction<InitialProjectType>) => {
      const newProject: ProjectType = {
        ...action.payload,
        projectId: generateProjectId(),
        trackCount: 0,
        submissionCount: 0,
        lastUpdated: new Date(),
      };
      state.projectsList.push(newProject);
      },
    editProject: (state, action: PayloadAction<ProjectType>) => {
      const index = state.projectsList.findIndex(
        (project: ProjectType) => project.projectId === action.payload.projectId
      );
      if (index !== -1){
        state.projectsList[index] = action.payload;
      }
    },
    deleteProject: (state, action: PayloadAction<string>) => {
      state.projectsList = state.projectsList.filter(
        (project: ProjectType) => project.projectId !== action.payload
      );
    },
  }
});

export const { setProject, editProject, deleteProject } = projectsSlice.actions;
export default projectsSlice.reducer;