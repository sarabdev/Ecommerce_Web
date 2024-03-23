const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Create a new review
router.post('/', reviewController.createReview);

// Get a review by ID
router.get('/:reviewId', reviewController.getReviewById);

// Update a review by ID
router.put('/:reviewId', reviewController.updateReview);

// Delete a review by ID
router.delete('/:reviewId', reviewController.deleteReview);

// Get all reviews
router.get('/', reviewController.getAllReviews);

// Get reviews by product ID
router.get('/product/:productId', reviewController.getReviewsByProductId);

// Get reviews by client ID
router.get('/client/:clientId', reviewController.getReviewsByClientId);

module.exports = router;
