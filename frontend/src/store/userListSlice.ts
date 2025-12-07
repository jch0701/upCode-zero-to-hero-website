import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type UserListType = {
  userId: number;
  username: string;
  email: string;
}

interface UserSlice {
  userList: UserListType[] | null;
}

export type InitialUserType = Omit<UserListType, never>; //Nothing omitted for the moment

const initialState: UserSlice = {
  userList: null,
};

const dummyState: UserSlice = {
  userList: [
    {
      userId: 1,
      username: "Alice",
      email: "alice@example.com"
    },
    {
      userId: 2,
      username: "Bob",
      email: "bob@example.com"
    },
    {
      userId: 3,
      username: "Charlie",
      email: "charlie@example.com"
    }
  ],
};

const userListSlice = createSlice({
  name: "userList",
  initialState: dummyState,
  reducers: {
    addNewUser(state, action: PayloadAction<InitialUserType>) {
      state.userList?.push(action.payload);
    },
    editUserInfo(state, action: PayloadAction<InitialUserType>) {
      const index = state.userList?.findIndex(user => user.username === action.payload.username);
      if (index !== undefined && index >= 0 && state.userList) {
        state.userList[index] = { ...state.userList[index], ...action.payload };
      }
    },
    deleteUser(state, action: PayloadAction<number>) {
      state.userList = state.userList?.filter(user => user.userId !== action.payload) || null;
    }
  },
});

export const { addNewUser, editUserInfo, deleteUser } = userListSlice.actions;
export default userListSlice.reducer;