import express from "express";
import { getMyProfile, updateMyProfile } from "../controllers/profileController/profile.js";
import { requireAuth } from "../controllers/profileController/requireAuth.js";
const router = express.Router();

router.get("/profile/me", requireAuth ,getMyProfile);
router.put("/profile/me", requireAuth, updateMyProfile);

export default router;
