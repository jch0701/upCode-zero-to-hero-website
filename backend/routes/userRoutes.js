import express from "express";

import { userLogin } from "../controllers/accountControllers/userLogin.js";
import { userSignup } from "../controllers/accountControllers/userSignup.js";
import { forgotPassword, resetPassword} from "../controllers/accountControllers/forgotPassword.js";
import { userLogout } from "../controllers/accountControllers/userLogout.js";
import { deleteUser } from "../controllers/accountControllers/deleteAccount.js";
import { requireAuth } from "../controllers/profileController/requireAuth.js";
import { getMyProfile, getSingleProfile, updateMyProfile, submitRoleApplication } from "../controllers/profileController/profile.js";
import { getAllSkills, getMySkills, updateMySkills, getUserSkills } from "../controllers/profileController/skill.js";
import { getUserActivity } from "../controllers/profileController/activity.js";
import { updateUserActivity } from "../controllers/profileController/activity.js";
import { syncUser, getIncomingRequests, sendFriendRequest, acceptRequest, rejectRequest, getFriends, getFriendStatus, deleteFriend } from "../controllers/profileController/friend.js";
const router = express.Router();
//signup login page api
router.post("/login", userLogin);
router.post("/signup", userSignup);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/logout", userLogout);
router.delete("/delete-account", requireAuth, deleteUser);

//profile api
router.get("/profile/me", requireAuth ,getMyProfile);
router.put("/profile/me", requireAuth, updateMyProfile);
router.get("/profile/:userID", getSingleProfile);
router.post("/submit-application", submitRoleApplication);

//skills api  
router.get("/skills/options", getAllSkills);
router.get("/skills/me", requireAuth, getMySkills);
router.post("/skills/me", requireAuth, updateMySkills);
router.get("/skills/:userId", getUserSkills)

//activity api
router.get("/activity/:userId", requireAuth, getUserActivity);
router.put("/activity/:userId", requireAuth, updateUserActivity);

// Sync
router.post('/users/sync', syncUser);

// Requests
router.get('/requests/:userId', getIncomingRequests);
router.post('/request', sendFriendRequest);
router.post('/accept', acceptRequest);
router.post('/reject', rejectRequest);

// Friends & Status
router.get('/list/:userId', getFriends);
router.get('/status', getFriendStatus);
router.delete("/friends/:friendId", requireAuth, deleteFriend);

export default router;