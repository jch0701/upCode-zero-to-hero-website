
import express from 'express';
import { requireAuth } from '../controllers/profileController/requireAuth.js';
import { submitApplication, getUserApplications, getCareerApplications, updateApplicationStatus, deleteApplication, updateApplicationDetails } from '../controllers/applicationController.js';

const router = express.Router();

// Submit application
router.post('/applications', requireAuth, submitApplication);

// Get my applications
router.get('/applications/user/:userId', requireAuth, getUserApplications);

// Get applications for a specific career (Company only)
router.get('/applications/career/:careerId', requireAuth, getCareerApplications);

// Update application status
router.put('/applications/:applicationId', requireAuth, updateApplicationStatus);

// Rescind Application
router.delete('/applications/:applicationId', requireAuth, deleteApplication); // Need to import this!

// Update Application Details
router.put('/applications/:applicationId/details', requireAuth, updateApplicationDetails); // Need to import this!

export default router;
