import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export type Announcement = {
  id: number | string;
  title: string;
  message: string;
  image?: string;
  createdAt: string;
  createdBy: string;
};

type AnnouncementState = {
  announcements: Announcement[];
};

type createAnnouncementPayload = {
  title: string;
  message: string;
  image?: string;
}

const initialState: AnnouncementState = {
  announcements: JSON.parse(
    localStorage.getItem("announcements") || "[]"
  ),
};

const announcementSlice = createSlice({
  name: "announcement",
  initialState,
  reducers: {
    addAnnouncement(state, action: PayloadAction<Announcement>) {
      state.announcements.unshift(action.payload);
      localStorage.setItem(
        "announcements",
        JSON.stringify(state.announcements)
      );
    },

    setAnnouncements(state, action: PayloadAction<Announcement[]>) {
      state.announcements = action.payload;
    },

    createAnnouncements(state, action: PayloadAction<createAnnouncementPayload>){
      const newAnnouncement = {
        id: Date.now(),
        title: action.payload.title,
        message: action.payload.message,
        image: action.payload.image,
        createdAt: new Date().toISOString().split("T")[0],
        createdBy: "admin",
      };
      state.announcements.unshift(newAnnouncement);
      localStorage.setItem("announcements", JSON.stringify(state.announcements));
    },

    deleteAnnouncements(state, action: PayloadAction<number>){
      state.announcements = state.announcements.filter(
        a=> Number(a.id) !== action.payload
      );
       localStorage.setItem(
        "announcements",
        JSON.stringify(state.announcements)
      );
    },

  },
});

export const { addAnnouncement, setAnnouncements, createAnnouncements, deleteAnnouncements} =
  announcementSlice.actions;

export default announcementSlice.reducer;
