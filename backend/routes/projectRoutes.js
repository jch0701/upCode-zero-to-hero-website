import express from 'express';
const router = express.Router();

// import controllers here
// Example: import { projectController } from '../controllers/projectController.js';

// ************************************************************
// Projects
// ************************************************************

// Get all projects (not including recommendations and submissions)
router.get('/projects/getAllBasicDetailsOnly');
// Get project by title, including recommendations, tracking data (user) and submissions (surface data)
router.get('/projects/getByTitleComplete/:title');

// Create, Update, Delete project
router.post('/projects/create');
// Post tracking data (user level) for the project
router.post('/projects/:id/trackingData');

router.put('/projects/update/:id');
router.delete('/projects/delete/:id');

// ************************************************************
// Submissions
// ************************************************************

// Get all submissions for a project (surface data only). 
// Might not be needed since we have getByTitleComplete
router.get('/projects/:projectId/getAllSubmissions');
// Get specific submission for a project (full details)
router.get('/projects/:projectId/getSubmission/:submissionId');

// Submit project with full details
router.post('/projects/:projectId/submit');
// Update specific submission for a project (full details)
router.post('/projects/:projectId/:submissionId/update');

// Delete specific submission for a project
router.delete('/projects/:projectId/:submissionId/delete');

// ************************************************************
// Recommendations
// ************************************************************
// This section's routes are largely secondary 

// Get all recommendations for a project
router.get('/projects/:projectId/getAllRecommendations');
// Add recommendation for a project
router.post('/projects/:projectId/recommendation/add');
// Update recommendation for a project (might be useful if we add weightage later)
router.put('/projects/:projectId/recommendation/:recommendationId/update');
// Delete recommendation for a project
router.delete('/projects/:projectId/recommendation/:recommendationId/delete');

export default router;