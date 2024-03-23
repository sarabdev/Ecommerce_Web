const PaymentTransaction = require('../models/PaymentTransaction');
const Order = require('../models/Order');

exports.addPaymentTransaction = async (req, res) => {
    try {
        const transactionData = req.body;
        const result = await PaymentTransaction.addPaymentTransaction(transactionData);
        res.status(201).json({ message: 'Payment transaction added successfully', transactionId: result.insertId });
    } catch (error) {
        console.error('Error adding payment transaction:', error);
        res.status(500).json({ message: 'Failed to add payment transaction' });
    }
};

exports.getPaymentTransactionById = async (req, res) => {
    try {
        const { transactionId } = req.params;
        const transaction = await PaymentTransaction.getPaymentTransactionById(transactionId);
        if (!transaction) {
            return res.status(404).json({ message: 'Payment transaction not found' });
        }
        // Get the associated order
        const order = await Order.getOrderById(transaction.OrderId);
        if (!order) {
            return res.status(404).json({ message: 'Associated order not found for this transaction' });
        }
        transaction.Order = order;
        res.status(200).json(transaction);
    } catch (error) {
        console.error('Error getting payment transaction by ID:', error);
        res.status(500).json({ message: 'Failed to retrieve payment transaction' });
    }
};

exports.updatePaymentTransaction = async (req, res) => {
    try {
        const { transactionId } = req.params;
        const transactionData = req.body;
        const result = await PaymentTransaction.updatePaymentTransaction(transactionId, transactionData);
        if (result === 0) {
            return res.status(404).json({ message: 'Payment transaction not found' });
        }
        res.status(200).json({ message: 'Payment transaction updated successfully' });
    } catch (error) {
        console.error('Error updating payment transaction:', error);
        res.status(500).json({ message: 'Failed to update payment transaction' });
    }
};

exports.deletePaymentTransaction = async (req, res) => {
    try {
        const { transactionId } = req.params;
        const result = await PaymentTransaction.deletePaymentTransaction(transactionId);
        if (result === 0) {
            return res.status(404).json({ message: 'Payment transaction not found' });
        }
        res.status(200).json({ message: 'Payment transaction deleted successfully' });
    } catch (error) {
        console.error('Error deleting payment transaction:', error);
        res.status(500).json({ message: 'Failed to delete payment transaction' });
    }
};

exports.getAllPaymentTransactions = async (req, res) => {
    try {
        const transactions = await PaymentTransaction.getAllPaymentTransactions();
        const transactionsWithOrders = [];
        for (const transaction of transactions) {
            const order = await Order.getOrderById(transaction.OrderId);
            if (order) {
                transaction.Order = order;
                transactionsWithOrders.push(transaction);
            }
        }
        res.status(200).json(transactionsWithOrders);
    } catch (error) {
        console.error('Error getting all payment transactions:', error);
        res.status(500).json({ message: 'Failed to retrieve payment transactions' });
    }
};
