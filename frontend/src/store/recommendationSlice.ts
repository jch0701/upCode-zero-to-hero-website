import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface RecommendationType {
  recommendationId: number;
  sourceId: number;
  targetId: number;
  sourceType: string;
  targetType: string;
}

interface RecommendationState {
  recommendations: RecommendationType[];
}

export type InitialRecommendation = Omit<RecommendationType, "recommendationId">;

let nextRecommendationId = 1;
function generateRecommendationId() {
  return nextRecommendationId++;
}

const initialState: RecommendationState = {
  recommendations: [
    {
      recommendationId: 1,
      sourceId: 100081,
      sourceType: "Chapter",
      targetId: 1,
      targetType: "Project"
    },
    {
      recommendationId: 2,
      sourceId: 100081,
      sourceType: "Chapter",
      targetId: 2,
      targetType: "Project"
    },
    {
      recommendationId: 3,
      sourceId: 100081,
      sourceType: "Chapter",
      targetId: 3,
      targetType: "Project"
    }
  ],
};

const recommendationSlice = createSlice({
  name: "recommendations",
  initialState,
  reducers: {
    createRecommendation: (state, action) => {
      const newRecommendation: RecommendationType = {
        recommendationId: generateRecommendationId(),
        ...action.payload,
      };
      state.recommendations.push(newRecommendation);
    },
    removeRecommendation: (state, action: PayloadAction<number>) => {
      state.recommendations = state.recommendations.filter(
        (rec) => rec.recommendationId !== action.payload
      );
    }
  }
});

export const { createRecommendation, removeRecommendation } = recommendationSlice.actions;
export default recommendationSlice.reducer;