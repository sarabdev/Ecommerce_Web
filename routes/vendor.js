const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');

// Sign up route
router.post('/signup', vendorController.signup);

// Login route
router.post('/login', vendorController.login);

module.exports = router;
