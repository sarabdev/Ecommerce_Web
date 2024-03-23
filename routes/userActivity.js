const express = require('express');
const router = express.Router();
const userActivityController = require('../controllers/userActivityController');

// Add a new user activity
router.post('/', userActivityController.addUserActivity);

// Get user activities by client ID
router.get('/client/:clientId', userActivityController.getUserActivityByClientId);

// Get all user activities
router.get('/', userActivityController.getAllUserActivities);

module.exports = router;
