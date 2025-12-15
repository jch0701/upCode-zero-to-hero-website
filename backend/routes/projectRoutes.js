import express from 'express';
import { getAllBasicDetailsOnly, getByTitleComplete } from '../controllers/projectControllers/projectsGet.js';
import { createProject, putTrackingData, updateProject, deleteProject } from '../controllers/projectControllers/projectsCUD.js';
import { getAllSubmissions, getSubmissionById } from '../controllers/projectControllers/submissionsGet.js';
import { submitProject, updateSubmission, deleteSubmission } from '../controllers/projectControllers/submissionsCUD.js';
import { getAllRecommendations, addRecommendation, updateRecommendation, deleteRecommendation } from '../controllers/projectControllers/recommendations.js';

const router = express.Router();

// import controllers here
// Example: import { projectController } from '../controllers/projectController.js';

// ************************************************************
// Projects
// ************************************************************

// Get all projects (not including recommendations and submissions)
router.get('/projects/getAllBasicDetailsOnly', getAllBasicDetailsOnly);
// Get project by title, including recommendations, tracking data (user) and submissions (surface data)
router.get('/projects/getByTitleComplete/:title', getByTitleComplete);

// Create, Update, Delete project
router.post('/projects/create', createProject);
// Put tracking data (user level) for the project
router.put('/projects/:id/trackingData', putTrackingData);

router.patch('/projects/update/:id', updateProject);
router.delete('/projects/delete/:id', deleteProject);

// ************************************************************
// Submissions
// ************************************************************

// Get all submissions for a project (surface data only). 
// Might not be needed since we have getByTitleComplete
router.get('/projects/:projectId/getAllSubmissions', getAllSubmissions);
// Get specific submission for a project (full details)
router.get('/projects/:projectId/getSubmissionById/:submissionId', getSubmissionById);

// Submit project with full details
router.post('/projects/:projectId/submit', submitProject);
// Update specific submission for a project (full details)
router.patch('/projects/:projectId/:submissionId/update', updateSubmission);

// Delete specific submission for a project
router.delete('/projects/:projectId/:submissionId/delete', deleteSubmission);

// ************************************************************
// Recommendations
// ************************************************************
// This section's routes are largely secondary 

// Get all recommendations for a project
router.get('/projects/:projectId/getAllRecommendations', getAllRecommendations);
// Add recommendation for a project
router.post('/projects/:projectId/recommendation/add', addRecommendation);
// Update recommendation for a project (might be useful if we add weightage later)
router.put('/projects/:projectId/recommendation/:recommendationId/update', updateRecommendation);
// Delete recommendation for a project
router.delete('/projects/:projectId/recommendation/:recommendationId/delete', deleteRecommendation);

export default router;