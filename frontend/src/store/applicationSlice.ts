
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "@/api/index";

export interface ApplicationItem {
  id: number;
  career_id: number;
  user_id: string;
  status: "Pending" | "Accepted" | "Rejected";
  applied_date: string;
  resume_link?: string;
  portfolio_link?: string;
}

interface ApplicationState {
  applicationList: ApplicationItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ApplicationState = {
  applicationList: [],
  status: "idle",
  error: null,
};

// Thunk to fetch user applications
export const fetchUserApplications = createAsyncThunk(
  "application/fetchUserApplications",
  async (userId: string) => {
    const response = await Api.get(`/applications/user/${userId}`);
    return response.data;
  }
);

// Thunk to submit application (optional if using React Query directly in component, but good for Redux consistency)
export const submitApplicationAsync = createAsyncThunk(
  "application/submitApplicationAsync",
  async (payload: { careerId: number; userId: string; resumeLink?: string }) => {
    const response = await Api.post('/applications', payload);
    return response.data;
  }
);

// Thunk to update status
export const updateApplicationStatusAsync = createAsyncThunk(
  "application/updateStatus",
  async (payload: { applicationId: number; status: "Accepted" | "Rejected" }) => {
    const response = await Api.put(`/applications/${payload.applicationId}`, { status: payload.status });
    return response.data;
  }
);

// Thunk to rescind (delete) application
export const rescindApplicationAsync = createAsyncThunk(
  "application/rescind",
  async (applicationId: number) => {
    await Api.delete(`/applications/${applicationId}`);
    return applicationId; // Return ID to remove from state
  }
);

// Thunk to update details (resume/portfolio)
export const updateApplicationDetailsAsync = createAsyncThunk(
  "application/updateDetails",
  async (payload: { applicationId: number; resumeLink: string; portfolioLink: string }) => {
    const response = await Api.put(`/applications/${payload.applicationId}/details`, payload);
    return response.data;
  }
);

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchUserApplications.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserApplications.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.applicationList = action.payload;
      })
      .addCase(fetchUserApplications.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch applications";
      })
      // Submit
      .addCase(submitApplicationAsync.fulfilled, (state, action) => {
        state.applicationList.push(action.payload);
      })
      // Rescind
      .addCase(rescindApplicationAsync.fulfilled, (state, action) => {
        state.applicationList = state.applicationList.filter(app => app.id !== action.payload);
      })
      // Update Details
      .addCase(updateApplicationDetailsAsync.fulfilled, (state, action) => {
        const index = state.applicationList.findIndex(app => app.id === action.payload.id);
        if (index !== -1) {
           state.applicationList[index] = action.payload;
        }
      });
  },
});

export default applicationSlice.reducer;
