import { configureStore } from "@reduxjs/toolkit";
import exampleSliceReducer from "./exampleSlice";
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
        example: exampleSliceReducer,
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