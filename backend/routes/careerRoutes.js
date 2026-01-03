import express from 'express';

import { getAllCareerDetail, getCareerDetail } from '../controllers/careerControllers/careerGet.js';
import { createCareer } from '../controllers/careerControllers/careerPost.js';
import { updateCareer } from '../controllers/careerControllers/careerPut.js';
import { deleteCareer } from '../controllers/careerControllers/careerDelete.js';

import { requireAuth } from "../controllers/profileController/requireAuth.js";

const router = express.Router();

// Public routes (anyone can view)
router.get('/careers', getAllCareerDetail);
router.get('/careers/:careerID', getCareerDetail);

// Protected routes (require login)
router.post('/careers', requireAuth, createCareer);
router.put('/careers/:careerID', requireAuth, updateCareer);
router.delete('/careers/:careerID', requireAuth, deleteCareer);

export default router;