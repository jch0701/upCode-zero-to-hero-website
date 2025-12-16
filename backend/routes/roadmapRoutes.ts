import express from 'express';

import { getRoadmap } from '../controllers/roadmapControllers/roadmapGET.ts';
import { createRoadmap, editRoadmap, deleteRoadmap } from '../controllers/roadmapControllers/roadmapCUD.ts';
import { getChapter } from '../controllers/roadmapControllers/chapterGET.ts';
import { createChapter, editChapter, deleteChapter } from '../controllers/roadmapControllers/chapterCUD.ts';
import { getLink } from '../controllers/roadmapControllers/linkGET.ts';
import { createLink, editLink, deleteLink } from '../controllers/roadmapControllers/linkCUD.ts';

const router = express.Router();
router.get('/roadmaps', getRoadmap);
router.post('/roadmaps', createRoadmap);
router.put('/roadmaps/:roadmapID', editRoadmap);
router.delete('/roadmaps/:roadmapID', deleteRoadmap);

router.get('/roadmaps/:roadmapID/chapters', getChapter);
router.post('/roadmaps/:roadmapID/chapters', createChapter);
router.put('/roadmaps/:roadmapID/chapters/:chapterID', editChapter);
router.delete('/roadmaps/:roadmapID/chapters/:chapterID', deleteChapter);

router.get('/roadmaps/:roadmapID/chapters/links', getLink);
router.post('/roadmaps/:roadmapID/chapters/links', createLink);
router.put('/roadmaps/:roadmapID/chapters/:chapterID/:nodeID', editLink);
router.delete('/roadmaps/:roadmapID/chapters/:chapterID/:nodeID', deleteLink);

export default router;