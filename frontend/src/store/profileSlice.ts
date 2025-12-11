import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type profileType = {
  userId: number;
  username: string;
  email:string;
  role:string;
  bio?:string;
  avatar: string;
  skill: string[];
  token?: string; //to come in the future
}

const initialState: profileType = {
  userId: 0, //default for testing
  username: "", //default for testing
  email:"",
  role:"",
  bio:"",
  avatar:"",
  skill: [],
  token: "",
};

const profileSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    login(state, action: PayloadAction<profileType>) {
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.bio = action.payload.bio ?? "";
      state.avatar = action.payload.avatar;
      state.skill = action.payload.skill ?? [];
      state.token = action.payload.token ?? "";
    },
    logout(state) {
      state.userId = NaN;
      state.username = "";
      state.email = "";
      state.role = "";
      state.bio = "";
      state.avatar = "";
      state.skill = [];
      state.token = "";
    }
  },
});

export const { login, logout } = profileSlice.actions;
export default profileSlice.reducer;