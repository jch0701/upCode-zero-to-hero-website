import express from 'express';

import { getAllCareerDetail, getCareerDetail } from '../controllers/careerControllers/careerGet.js';

const router = express.Router();
router.get('/careers', getAllCareerDetail);
router.get('/careers/:careerID', getCareerDetail);

export default router;