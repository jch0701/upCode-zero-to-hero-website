import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type profileType = {
  userId: number;
  username: string;
  token?: string; //to come in the future
}

const initialState: profileType = {
  userId: 1, //default for testing
  username: "Alice", //default for testing
  token: "",
};

const profileSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    logout(state) {
      state.username = "";
    }
  },
});

export const { login, logout } = profileSlice.actions;
export default profileSlice.reducer;