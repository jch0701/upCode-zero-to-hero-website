import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CareerApplication {
  userId: string; // store userId
  resumeUrl?: string;
  projectUrl?: string;
  repoUrl?: string;
  submittedAt: string;
}

export interface CareerItem {
  id: number;
  title: string;
  description?: string;
  category: string;
  isNew?: boolean;
  isViewed?: boolean;
  isUserApplication?: boolean;
  company?: string;
  postedBy?: string;
  location?: string;
  level?: "Beginner" | "Intermediate" | "Advanced";
  createdDate?: string;
  mapLink?: string; // embed link for Google Maps
  prerequisites?: string[];
  slug?: string;
  applications?: CareerApplication[];
}

interface CareerState {
  careerList: CareerItem[];
}

const initialState: CareerState = {
  careerList: [
    {
      id: 1,
      title: "Full-Stack Developer Trainee",
      description:
        "Hands-on training in full-stack web development, focusing on JavaScript and React.",
      category: "Software Developer",
      postedBy: "Admin",
      level: "Beginner",
      createdDate: "2025-12-10",
      mapLink:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63560.739184568134!2d100.25236006953129!3d5.333234845004132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304ac1a96f010e97%3A0x8b91d5d092b91828!2sSchool%20of%20Computer%20Sciences%2C%20USM!5e0!3m2!1sen!2smy!4v1765641942623!5m2!1sen!2smy",
      prerequisites: ["JavaScript", "React", "GitHub Portfolio"],
      applications: [],
    },
    {
      id: 2,
      title: "Data Scientist Intern",
      description:
        "Introductory role in data science, focusing on Python, Pandas, and ML basics.",
      category: "Data Scientist",
      postedBy: "Admin",
      level: "Beginner",
      createdDate: "2025-12-11",
      mapLink:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d997.123456789!2d100.285!3d5.417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304ac123456789ab%3A0xabcdefabcdef!2sPenang%20Science%20Park!5e0!3m2!1sen!2smy!4v1765642000000!5m2!1sen!2smy",
      prerequisites: ["Python", "Pandas", "Machine Learning Basics"],
      applications: [],
    },
  ],
};

const careerSlice = createSlice({
  name: "career",
  initialState,
  reducers: {
    addCareer(state, action: PayloadAction<CareerItem>) {
      state.careerList.push(action.payload);
    },
    editCareer(state, action: PayloadAction<CareerItem>) {
      const index = state.careerList.findIndex(
        (c) => c.id === action.payload.id
      );
      if (index !== -1) {
        state.careerList[index] = {
          ...state.careerList[index],
          ...action.payload,
        };
      }
    },
    deleteCareer(state, action: PayloadAction<number>) {
      state.careerList = state.careerList.filter(
        (c) => c.id !== action.payload
      );
    },
    markViewed(state, action: PayloadAction<number>) {
      const item = state.careerList.find((c) => c.id === action.payload);
      if (item) item.isViewed = true;
    },
    addApplication(
      state,
      action: PayloadAction<{
        careerId: number;
        application: CareerApplication;
      }>
    ) {
      const career = state.careerList.find(
        (c) => c.id === action.payload.careerId
      );
      if (career) {
        if (!career.applications) career.applications = [];
        career.applications.push(action.payload.application);
      }
    },
  },
});

export const {
  addCareer,
  editCareer,
  deleteCareer,
  markViewed,
  addApplication,
} = careerSlice.actions;
export default careerSlice.reducer;
