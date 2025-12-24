import express from "express";
import { getMyProfile, getSingleProfile, updateMyProfile } from "../controllers/profileController/profile.js";
import { requireAuth } from "../controllers/profileController/requireAuth.js";
const router = express.Router();

// router.get("/profile/getProfile/:userId", requireAuth ,getMyProfile);
// router.put("/profile/updateProfile/:userId", requireAuth, updateMyProfile);

router.get("/profile/me", requireAuth ,getMyProfile);
router.put("/profile/me", requireAuth, updateMyProfile);
router.get("/profile/:userID", getSingleProfile);
export default router;
