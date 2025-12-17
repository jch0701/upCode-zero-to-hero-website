import express from 'express';

import { getAllRoadmap, getRoadmap } from '../controllers/roadmapControllers/roadmapGET.js';
import { createRoadmap, editRoadmap, deleteRoadmap } from '../controllers/roadmapControllers/roadmapCUD.js';
import { getChapter } from '../controllers/roadmapControllers/chapterGET.js';
import { createChapter, editChapter, deleteChapter } from '../controllers/roadmapControllers/chapterCUD.js';
import { getLink } from '../controllers/roadmapControllers/linkGET.js';
import { createLink, editLink, deleteLink } from '../controllers/roadmapControllers/linkCUD.js';

const router = express.Router();
router.get('/roadmaps', getAllRoadmap);
router.get('/roadmaps/:roadmapID', getRoadmap);
router.post('/roadmaps/create', createRoadmap);
router.put('/roadmaps/:roadmapID', editRoadmap);
router.delete('/roadmaps/:roadmapID', deleteRoadmap);

router.get('/roadmaps/:roadmapID/chapters', getChapter);
router.post('/roadmaps/:roadmapID/chapters', createChapter);
router.put('/roadmaps/:roadmapID/chapters/:chapterID', editChapter);
router.delete('/roadmaps/:roadmapID/chapters/:chapterID', deleteChapter);

router.get('/roadmaps/:roadmapID/chapters/:chapterID', getLink);
router.post('/roadmaps/:roadmapID/chapters/:chapterID', createLink);
router.put('/roadmaps/:roadmapID/chapters/:chapterID/:nodeID', editLink);
router.delete('/roadmaps/:roadmapID/chapters/:chapterID/:nodeID', deleteLink);

export default router;