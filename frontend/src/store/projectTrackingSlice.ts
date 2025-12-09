import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ProjectTrackingRecord {
  userId: number;
  projectId: number;
  isTracking: boolean;
  isMarkedAsDone: boolean;
}

interface ProjectTrackingState {
  records: ProjectTrackingRecord[];
}

const initialState: ProjectTrackingState = {
  records: [],
};

const projectTrackingSlice = createSlice({
  name: "projectTracking",
  initialState,
  reducers: {
    setTrackingStatus: (state, action: PayloadAction<ProjectTrackingRecord>) => {
      const { userId, projectId, isTracking, isMarkedAsDone } = action.payload;
      const existingRecordIndex = state.records.findIndex(
        (record) => record.userId === userId && record.projectId === projectId
      );
      if (!isTracking && !isMarkedAsDone && existingRecordIndex !== -1) {
        state.records.splice(existingRecordIndex, 1);
      }
      else if (existingRecordIndex !== -1) {
        state.records[existingRecordIndex] = {
          userId,
          projectId,
          isTracking,
          isMarkedAsDone,
        };
      } else {
        state.records.push(action.payload);
      }
    },
  }
});

export const { setTrackingStatus } = projectTrackingSlice.actions;
export default projectTrackingSlice.reducer;