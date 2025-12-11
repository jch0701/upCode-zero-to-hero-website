import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CareerItem {
  id: number;
  title: string;
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
}

interface CareerState {
  careerList: CareerItem[];
}

const initialState: CareerState = {
  careerList: [
    {
      id: 1,
      title: "Full-Stack Developer Trainee",
      category: "Software Developer",
      company: "CodeWorks",
      postedBy: "CodeWorksHR",
      location: "Kuala Lumpur, Malaysia",
      level: "Beginner",
      isNew: true,
      createdDate: "2025-12-10",
      mapLink:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2808.912153499002!2d100.30116925242991!3d5.355519256493747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304ac1a96f010e97%3A0x8b91d5d092b91828!2sSchool%20of%20Computer%20Sciences%2C%20USM!5e0!3m2!1sen!2smy!4v1765425320356!5m2!1sen!2smy",
      prerequisites: ["JavaScript", "React", "GitHub Portfolio"],
    },
    {
      id: 2,
      title: "AI Analyst Intern",
      category: "AI Analytics",
      company: "SanDisk",
      postedBy: "SanDiskHR",
      location: "San Jose, CA",
      level: "Beginner",
      isNew: true,
      createdDate: "2025-12-09",
      mapLink:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.6650914843894!2d100.2848509414146!3d5.314834298710208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304ac1d0344ef733%3A0x24cc27c4773a418e!2sTOWA%20TOOL%20Sdn%20Bhd!5e0!3m2!1sen!2smy!4v1765425759036!5m2!1sen!2smy",
      prerequisites: ["Python", "Data Visualization", "SQL"],
    },
    {
      id: 3,
      title: "Junior Software Engineer",
      category: "Software Engineer",
      company: "TechNova",
      postedBy: "TechNovaHR",
      location: "Penang, Malaysia",
      level: "Intermediate",
      isViewed: true,
      createdDate: "2025-12-08",
      mapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d997...",
      prerequisites: ["Java", "Spring Boot", "Unit Testing"],
    },
    {
      id: 4,
      title: "Data Scientist Intern",
      category: "Data Scientist",
      company: "DataNest",
      postedBy: "DataNestHR",
      location: "Singapore",
      level: "Beginner",
      isViewed: true,
      createdDate: "2025-12-07",
      mapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876...",
      prerequisites: ["Python", "Pandas", "Jupyter Notebook"],
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
  },
});

export const { addCareer, editCareer, deleteCareer, markViewed } =
  careerSlice.actions;
export default careerSlice.reducer;
