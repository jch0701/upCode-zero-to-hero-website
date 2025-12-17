import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type OverviewImage = {
  id: number;
  src: string; // base64 or URL
};

type OverviewImageState = {
  images: OverviewImage[];
};

const initialState: OverviewImageState = {
  images: JSON.parse(localStorage.getItem("overviewImages") || "[]"),
};

const overviewImageSlice = createSlice({
  name: "overviewImages",
  initialState,
  reducers: {
    
    setImages(state, action: PayloadAction<OverviewImage[]>) {
      state.images = action.payload;
      localStorage.setItem("overviewImages", JSON.stringify(state.images));
    },
  },
});

export const { setImages } = overviewImageSlice.actions;
export default overviewImageSlice.reducer;
