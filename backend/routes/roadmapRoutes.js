import express from 'express';

import { getAllRoadmap, getRoadmap } from '../controllers/roadmapControllers/roadmapGET.js';
import { createRoadmap, editRoadmap, deleteRoadmap } from '../controllers/roadmapControllers/roadmapCUD.js';
import { getAllChapter, getRoadmapChapter, getChapter } from '../controllers/roadmapControllers/chapterGET.js';
import { createChapter, editChapter, deleteChapter } from '../controllers/roadmapControllers/chapterCUD.js';
import { getAllLink, getChapterLink, getLink } from '../controllers/roadmapControllers/linkGET.js';
import { createLink, editLink, deleteLink } from '../controllers/roadmapControllers/linkCUD.js';
import { getUserDetail } from '../controllers/roadmapControllers/userGET.js';

const router = express.Router();
router.get('/roadmaps', getAllRoadmap);
router.get('/roadmaps/:roadmapID', getRoadmap);

router.post('/roadmaps', createRoadmap);
router.put('/roadmaps/:roadmapID', editRoadmap);
router.delete('/roadmaps/:roadmapID', deleteRoadmap);



router.get('/chapters', getAllChapter)
router.get('/roadmaps/:roadmapID/chapters', getRoadmapChapter);
router.get('/roadmaps/:roadmapID/chapters/:chapterID', getChapter);

router.post('/roadmaps/:roadmapID/chapters', createChapter);
router.put('/roadmaps/:roadmapID/chapters/:chapterID', editChapter);
router.delete('/roadmaps/:roadmapID/chapters/:chapterID', deleteChapter);



router.get('/links', getAllLink)
router.get('/chapters/:chapterID/links', getChapterLink)
router.get('/chapters/:chapterID/links/:linkID', getLink);

router.post('/chapters/:chapterID/links', createLink);
router.put('/chapters/:chapterID/links/:linkID', editLink);
router.delete('/chapters/:chapterID/links/:linkID', deleteLink);



router.get('/users/:userID', getUserDetail);

export default router;