import express from 'express';
import { getAllBasicDetailsOnly, getByTitleComplete, getByIdComplete, getAllRelatedToUser, getRandomProject } from '../controllers/projectControllers/projectsGet.js';
import { createProject, putTrackingData, updateProject, deleteProject } from '../controllers/projectControllers/projectsCUD.js';
import { getAllSubmissions, getAllSubmissionsByUser, getSubmissionById } from '../controllers/projectControllers/submissionsGet.js';
import { submitToProject, updateSubmission, deleteSubmission } from '../controllers/projectControllers/submissionsCUD.js';
import { getAllRecommendations, addRecommendation, updateRecommendation, deleteRecommendation } from '../controllers/projectControllers/recommendations.js';

const router = express.Router();

// import controllers here
// Example: import { projectController } from '../controllers/projectController.js';

// ************************************************************
// Projects
// ************************************************************

// Get all projects (not including recommendations and submissions)
router.get('/projects/getAllBasicDetailsOnly', getAllBasicDetailsOnly);
router.get('/projects/getAllBasicDetailsOnly/:userId', getAllBasicDetailsOnly);
router.get('/projects/getAllRelatedToUser/:userID', getAllRelatedToUser);
// Get project by title, including recommendations, tracking data (user) and submissions (surface data)
router.get('/projects/getByTitleComplete/:title', getByTitleComplete);
router.get('/projects/getByTitleComplete/:title/:userId', getByTitleComplete);
// Get project by projectId including recommendations, tracking data (user) and submissions (surface data)
router.get('/projects/getByIdComplete/:projectId', getByIdComplete);
router.get('/projects/getByIdComplete/:projectId/:userId', getByIdComplete);
// Get random project including recommendations, tracking data (user) and submissions (surface data)
router.get('/projects/getRandomProject/:userId', getRandomProject);

// Create, Update, Delete project
router.post('/projects/create', createProject);
// Put tracking data (user level) for the project
router.put('/projects/:projectId/putTrackingData/:userId', putTrackingData);

router.put('/projects/update/:projectId', updateProject);
router.delete('/projects/delete/:projectId', deleteProject);

// ************************************************************
// Submissions
// ************************************************************

// Get all submissions for a project (surface data only). 
// Might not be needed since we have getByTitleComplete
router.get('/projects/:projectId/submissions/getAllSubmissions', getAllSubmissions);
router.get('/projects/:userId/submissions/getAllSubmissionsByUser', getAllSubmissionsByUser);
// Get specific submission for a project (full details)
router.get('/projects/:projectId/submissions/getSubmissionById', getSubmissionById);
router.get('/projects/:projectId/submissions/getSubmissionById/:submissionId', getSubmissionById);

// Submit project with full details
router.post('/projects/:projectId/submissions/submit', submitToProject);
// Update specific submission for a project (full details)
router.patch('/projects/:projectId/submissions/:submissionId/update', updateSubmission);

// Delete specific submission for a project
router.delete('/projects/:projectId/submissions/:submissionId/delete', deleteSubmission);

// ************************************************************
// Recommendations
// ************************************************************
// This section's routes are largely secondary 

// Get all recommendations for a project
router.get('/projects/:projectId/recommendations/getAllRecommendations', getAllRecommendations);
// Add recommendation for a project
router.post('/projects/:projectId/recommendations/add', addRecommendation);
// Update recommendation for a project (might be useful if we add weightage later)
router.put('/projects/recommendations/:recommendationId/update', updateRecommendation);
// Delete recommendation for a project
router.delete('/projects/recommendations/:recommendationId/delete', deleteRecommendation);

export default router;