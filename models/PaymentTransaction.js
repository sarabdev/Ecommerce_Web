const db = require('../config/database');

class PaymentTransaction {
    async addPaymentTransaction(transactionData) {
        try {
            const result = await db('PaymentTransactions').insert(transactionData);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getPaymentTransactionById(transactionId) {
        try {
            const transaction = await db('PaymentTransactions').where('TransactionId', transactionId).first();
            return transaction;
        } catch (error) {
            throw error;
        }
    }

    async updatePaymentTransaction(transactionId, transactionData) {
        try {
            const result = await db('PaymentTransactions').where('TransactionId', transactionId).update(transactionData);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async deletePaymentTransaction(transactionId) {
        try {
            const result = await db('PaymentTransactions').where('TransactionId', transactionId).del();
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getAllPaymentTransactions() {
        try {
            const transactions = await db('PaymentTransactions').select('*');
            return transactions;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new PaymentTransaction();
