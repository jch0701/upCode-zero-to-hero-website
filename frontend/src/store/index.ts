import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "./projectsSlice";
import submissionsReducer from "./submissionsSlice";
import profileReducer from "./profileSlice";
import projectTrackingReducer from "./projectTrackingSlice";
import recommendationReducer from "./recommendationSlice";
import careerReducer from "./careerSlice";
import announcementSlice from "./announcementSlice";
import overviewImagesReducer from "./overviewImageSlices";
// Import your reducers here
// Example: import userReducer from "./slices/userSlice";
// import roadmapReducer from "./roadmapSlice";
// import pillarReducer from "./pillarsSlice";
// import linkReducer from "./linksSlice";
// import userListReducer from "./userListSlice";

// Load from local storage
function loadUserInfo() {
  try {
    const raw = localStorage.getItem("userInfo");
    if (!raw) return undefined;
    return JSON.parse(raw);
  } catch {
    return undefined;
  }
}

function saveUserInfo(profile: any) {
  try {
    localStorage.setItem("userInfo", JSON.stringify(profile));
  } catch {}
}

// provide only the userInfo slice as preloadedState
const preloadedState = {
  profile: loadUserInfo() ?? undefined,
};

export const store = configureStore({
  reducer: {
    // Add your reducers here
    // Example: user: userReducer,
    // projects: projectsReducer,
    // submissions: submissionsReducer,
    // // userList: userListReducer,
    // profile: profileReducer,
    // // roadmap: roadmapReducer,
    // // chapter: pillarReducer,
    // // link: linkReducer,
    // projectTracking: projectTrackingReducer,
    // recommendations: recommendationReducer,
    // career: careerReducer,
    // announcement: announcementSlice,
    // overviewImages: overviewImagesReducer,
  } as any,
  preloadedState,
});

// persist only userInfo on changes
let prevUserInfo: any;
store.subscribe(() => {
  const state: any = store.getState();
  if (state.profile !== prevUserInfo) {
    prevUserInfo = state.profile;
    saveUserInfo(state.profile);
  }
});

export default store;

// Types for use throughout the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
