const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const verifyAuth= require("../middleware/verifyAuth")

// Sign up route
router.post('/signup', clientController.signup);

// Login route
router.post('/login', clientController.login);

// Change Password
router.post('/change_password',verifyAuth, clientController.changePassword)

module.exports = router;
