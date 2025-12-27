import express from 'express';

import { requireAuth } from "../controllers/profileController/requireAuth.js";
import { getDashboardStats, getUsersList, deleteUser } from "../controllers/adminControllers/admin.js";
import { createAnnouncement, getAnnouncements, deleteAnnouncement, getAdvertisements, updateAdvertisements } from "../controllers/adminControllers/content.js";
const router = express.Router();

router.get("/stats", requireAuth, getDashboardStats);

// Announcements
router.get("/announcements", getAnnouncements); 
router.post("/announcements", requireAuth, createAnnouncement);
router.delete("/announcements/:id", requireAuth, deleteAnnouncement);

// Users 
router.get("/users", requireAuth, getUsersList);
router.delete("/users/:userId", requireAuth, deleteUser);

// Advertisements
router.get("/ads", getAdvertisements); 
router.put("/ads", requireAuth, updateAdvertisements);

export default router;