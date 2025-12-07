import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type UserListType = {
  userId: number;
  username: string;
  email: string;
  password: string;
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
      email: "alice@example.com",
      password: "12345678"
    },
    {
      userId: 2,
      username: "Bob",
      email: "bob@example.com",
      password: "12345678"
    },
    {
      userId: 3,
      username: "Charlie",
      email: "charlie@example.com",
      password: "12345678"
    },
    {
      userId: "100000",
      username: "Xin Sheng",
      email: "xinsheng04@example.com",
      password: "12345678"
    },
    {
      userId: "100001",
      username: "Jia Liang",
      email: "jialiang04@example.com",
      password: "12345678"
    },
    {
      userId: "100003",
      username: "SeeWatt",
      email: "seewatt@example.com",
      password: "12345678"
    },
    {
      userId: "100004",
      username: "Guest Me",
      email: "guestme@example.com",
      password: "12345678"
    },
    {
      userId: "100005",
      username: "Lenard",
      email: "lenard@example.com",
      password: "12345678"
    },
    {
      userId: "100006",
      username: "Wun Zhe",
      email: "wunzhe04@example.com",
      password: "12345678"
    },
    {
      userId: "100007",
      username: "Jee",
      email: "jch04@example.com",
      password: "12345678"
    },
    {
      userId: "100008",
      username: "Admin",
      email: "admin@example.com",
      password: "12345678"
    },
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