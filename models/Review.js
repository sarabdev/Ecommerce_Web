const db = require('../config/database');

class Review {
    // Create a new review
    async createReview(reviewData) {
        try {
            const result = await db('Reviews').insert(reviewData);
            return result[0]; // Return the inserted review ID
        } catch (error) {
            throw error;
        }
    }

    // Get review by ID
    async getReviewById(reviewId) {
        try {
            const [review] = await db('Reviews').where('ReviewId', reviewId);
            return review;
        } catch (error) {
            throw error;
        }
    }

    // Update review by ID
    async updateReview(reviewId, reviewData) {
        try {
            const result = await db('Reviews').where('ReviewId', reviewId).update(reviewData);
            return result;
        } catch (error) {
            throw error;
        }
    }

    // Delete review by ID
    async deleteReview(reviewId) {
        try {
            const result = await db('Reviews').where('ReviewId', reviewId).del();
            return result;
        } catch (error) {
            throw error;
        }
    }

    // Get all reviews
    async getAllReviews() {
        try {
            const reviews = await db('Reviews');
            return reviews;
        } catch (error) {
            throw error;
        }
    }

    // Get reviews by product ID
    async getReviewsByProductId(productId) {
        try {
            const reviews = await db('Reviews').where('ProductId', productId);
            return reviews;
        } catch (error) {
            throw error;
        }
    }

    // Get reviews by client ID
    async getReviewsByClientId(clientId) {
        try {
            const reviews = await db('Reviews').where('ClientId', clientId);
            return reviews;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new Review();
