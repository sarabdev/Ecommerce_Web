const reviewModel = require('../models/Review');
const productModel = require('../models/ProductItem');
const clientModel = require('../models/Client');

// Controller for handling review-related operations

// Create a new review
exports.createReview = async (req, res) => {
    try {
        const reviewData = {
            ...req.body,
        };
        const result = await reviewModel.createReview(reviewData);
        res.status(201).json({ message: 'Review created successfully', reviewId: result });
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ message: 'Failed to create review' });
    }
};

// Get review by ID
exports.getReviewById = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const review = await reviewModel.getReviewById(reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        const product = await productModel.getProductById(review.ProductId);
        const client = await clientModel.getClientById(review.ClientId);
        const reviewWithDetails = {
            ...review,
            product: product,
            client: client
        };
        res.status(200).json(reviewWithDetails);
    } catch (error) {
        console.error('Error getting review by ID:', error);
        res.status(500).json({ message: 'Failed to retrieve review' });
    }
};

// Update review by ID
exports.updateReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const updatedReviewData = req.body;
        const result = await reviewModel.updateReview(reviewId, updatedReviewData);
        if (result === 0) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json({ message: 'Review updated successfully' });
    } catch (error) {
        console.error('Error updating review:', error);
        res.status(500).json({ message: 'Failed to update review' });
    }
};

// Delete review by ID
exports.deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const result = await reviewModel.deleteReview(reviewId);
        if (result === 0) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ message: 'Failed to delete review' });
    }
};

// Get all reviews
exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await reviewModel.getAllReviews();
        const reviewsWithDetails = await Promise.all(reviews.map(async review => {
            const product = await productModel.getProductById(review.ProductId);
            const client = await clientModel.getClientById(review.ClientId);
            return {
                ...review,
                product: product,
                client: client
            };
        }));
        res.status(200).json(reviewsWithDetails);
    } catch (error) {
        console.error('Error getting all reviews:', error);
        res.status(500).json({ message: 'Failed to retrieve reviews' });
    }
};

// Get reviews by product ID
exports.getReviewsByProductId = async (req, res) => {
    try {
        const { productId } = req.params;
        const reviews = await reviewModel.getReviewsByProductId(productId);
        const reviewsWithDetails = await Promise.all(reviews.map(async review => {
            const product = await productModel.getProductById(review.ProductId);
            const client = await clientModel.getClientById(review.ClientId);
            return {
                ...review,
                product: product,
                client: client
            };
        }));
        res.status(200).json(reviewsWithDetails);
    } catch (error) {
        console.error('Error getting reviews by product ID:', error);
        res.status(500).json({ message: 'Failed to retrieve reviews' });
    }
};

// Get reviews by client ID
exports.getReviewsByClientId = async (req, res) => {
    try {
        const { clientId } = req.params;
        const reviews = await reviewModel.getReviewsByClientId(clientId);
        const reviewsWithDetails = await Promise.all(reviews.map(async review => {
            const product = await productModel.getProductById(review.ProductId);
            const client = await clientModel.getClientById(review.ClientId);
            return {
                ...review,
                product: product,
                client: client
            };
        }));
        res.status(200).json(reviewsWithDetails);
    } catch (error) {
        console.error('Error getting reviews by client ID:', error);
        res.status(500).json({ message: 'Failed to retrieve reviews' });
    }
};
