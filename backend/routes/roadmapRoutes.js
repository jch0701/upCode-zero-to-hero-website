import express from 'express';

import { getAllRoadmap, getRoadmap } from '../controllers/roadmapControllers/roadmapGET.js';
import { createRoadmap, editRoadmap, deleteRoadmap } from '../controllers/roadmapControllers/roadmapCUD.js';
import { getAllChapter, getRoadmapChapter, getChapter } from '../controllers/roadmapControllers/chapterGET.js';
import { createChapter, editChapter, deleteChapter } from '../controllers/roadmapControllers/chapterCUD.js';
import { getAllLink, getChapterLink, getLink } from '../controllers/roadmapControllers/linkGET.js';
import { createLink, editLink, deleteLink } from '../controllers/roadmapControllers/linkCUD.js';
import { getUserDetail } from '../controllers/roadmapControllers/userGET.js';
import { createChapterRecord, createFavouriteRecord, createLinkRecord, deleteChapterRecord, deleteFavouriteRecord, deleteLinkRecord } from '../controllers/roadmapControllers/recordCUD.js';
import { getAllRoadmapRecommendation, createRoadmapRecommendation, deleteRoadmapRecommendation } from '../controllers/roadmapControllers/recommendation.js';

const router = express.Router();
router.get('/roadmaps', getAllRoadmap);
router.get('/roadmaps/:roadmapID', getRoadmap);

router.post('/roadmaps', createRoadmap);
router.patch('/roadmaps/:roadmapID', editRoadmap);
router.delete('/roadmaps/:roadmapID', deleteRoadmap);



router.get('/chapters', getAllChapter)
router.get('/roadmaps/:roadmapID/chapters', getRoadmapChapter);
router.get('/roadmaps/:roadmapID/chapters/:chapterID', getChapter);

router.post('/roadmaps/:roadmapID/chapters', createChapter);
router.patch('/roadmaps/:roadmapID/chapters/:chapterID', editChapter);
router.delete('/chapters/:chapterID', deleteChapter);



router.get('/links', getAllLink)
router.get('/chapters/:chapterID/links', getChapterLink)
router.get('/chapters/:chapterID/links/:linkID', getLink);

router.post('/chapters/:chapterID/links', createLink);
router.patch('/chapters/:chapterID/links/:linkID', editLink);
router.delete('/links/:linkID', deleteLink);



router.post('/favouriteroadmaps', createFavouriteRecord);
router.delete('/favouriteroadmaps', deleteFavouriteRecord);
router.post('/chapterviews', createChapterRecord);
router.delete('/chapterviews', deleteChapterRecord);
router.post('/nodeviews', createLinkRecord);
router.delete('/nodeviews', deleteLinkRecord);


router.get('/roadmaps/recommendations', getAllRoadmapRecommendation);
router.post('/roadmaps/recommendations', createRoadmapRecommendation);
router.delete('/roadmaps/recommendations', deleteRoadmapRecommendation);



router.get('/users/:userID', getUserDetail);

export default router;