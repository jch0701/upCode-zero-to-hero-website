import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "./projectsSlice";
import submissionsReducer from "./submissionsSlice";
import userListReducer from "./userListSlice";
import profileReducer from "./profileSlice";  
import roadmapReducer from "./roadmapSlice";
import pillarReducer from "./pillarsSlice";
import linkReducer from "./linksSlice";
// Import your reducers here
// Example: import userReducer from "./slices/userSlice";

// Load from local storage 
function loadUserInfo(){
  try{
    const raw = localStorage.getItem('userInfo');
    if (!raw) return undefined;
    return JSON.parse(raw);
  }catch{
    return undefined;
  }
}

function saveUserInfo(userInfo:any){
  try{
    localStorage.setItem('userInfo',JSON.stringify(userInfo));
  }
  catch{}
}

// provide only the userInfo slice as preloadedState
const preloadedState= { 
  userInfo: loadUserInfo()?? undefined,
}

export const store = configureStore({
    reducer: {
        // Add your reducers here
        // Example: user: userReducer,
        projects: projectsReducer,
        submissions: submissionsReducer,
        userList: userListReducer,
        profile: profileReducer,
        roadmap: roadmapReducer,
        chapter: pillarReducer,
        link: linkReducer,
    } as any,
    preloadedState,
});

// persist only userInfo on changes
let prevUserInfo: any;
store.subscribe(() => {
  const state: any = store.getState();
  if (state.userInfo !== prevUserInfo) {
    prevUserInfo = state.userInfo;
    saveUserInfo(state.userInfo);
  }
});

export default store;

// Types for use throughout the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;