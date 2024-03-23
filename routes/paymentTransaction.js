const express = require('express');
const router = express.Router();
const paymentTransactionController = require('../controllers/paymentTransactionController');

// Add a new payment transaction
router.post('/', paymentTransactionController.addPaymentTransaction);

// Get a payment transaction by ID
router.get('/:transactionId', paymentTransactionController.getPaymentTransactionById);

// Update a payment transaction by ID
router.put('/:transactionId', paymentTransactionController.updatePaymentTransaction);

// Delete a payment transaction by ID
router.delete('/:transactionId', paymentTransactionController.deletePaymentTransaction);

// Get all payment transactions
router.get('/', paymentTransactionController.getAllPaymentTransactions);

module.exports = router;
