import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import Api from "../api/index";

export interface CareerApplication {
  id: number;
  user_id: string;
  career_id: number;
  status: "Pending" | "Accepted" | "Rejected";
  resume_link?: string;
  portfolio_link?: string;
  applied_date: string;
  user?: { username: string };
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
  mapLink?: string;
  prerequisites?: string[];
  slug?: string;
  applications?: CareerApplication[];
}

interface CareerState {
  careerList: CareerItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CareerState = {
  careerList: [],
  status: "idle",
  error: null,
};

// Async thunk to fetch all careers
export const fetchCareers = createAsyncThunk(
  "career/fetchCareers",
  async () => {
    const res = await Api.get("/careers");
    return res.data as CareerItem[];
  }
);

// Async thunk to add a career
export const addCareerAsync = createAsyncThunk(
  "career/addCareerAsync",
  async (newCareer: CareerItem) => {
    const res = await Api.post("/careers", newCareer);
    return res.data as CareerItem;
  }
);

// Async thunk to edit a career
export const editCareerAsync = createAsyncThunk(
  "career/editCareerAsync",
  async (updatedCareer: CareerItem) => {
    const res = await Api.put(
      `/careers/${updatedCareer.id}`,
      updatedCareer
    );
    return res.data as CareerItem;
  }
);

// Async thunk to delete a career
export const deleteCareerAsync = createAsyncThunk(
  "career/deleteCareerAsync",
  async (careerId: number) => {
    await Api.delete(`/careers/${careerId}`);
    return careerId;
  }
);

const careerSlice = createSlice({
  name: "career",
  initialState,
  reducers: {
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
  extraReducers: (builder) => {
    builder
      // Fetch careers
      .addCase(fetchCareers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCareers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.careerList = action.payload;
        state.error = null;
      })
      .addCase(fetchCareers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Error fetching careers";
      })

      // Add career
      .addCase(addCareerAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addCareerAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.careerList.push(action.payload);
        state.error = null;
      })
      .addCase(addCareerAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Error adding career";
      })

      // Edit career
      .addCase(editCareerAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editCareerAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.careerList.findIndex(
          (c) => c.id === action.payload.id
        );
        if (index !== -1) {
          state.careerList[index] = action.payload;
        }
      })
      .addCase(editCareerAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Error editing career";
      })

      // Delete career
      .addCase(deleteCareerAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCareerAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.careerList = state.careerList.filter(
          (c) => c.id !== action.payload
        );
      })
      .addCase(deleteCareerAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Error deleting career";
      });
  },
});

export const { markViewed, addApplication } = careerSlice.actions;
export default careerSlice.reducer;
