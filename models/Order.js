const db = require('../config/database');

class Order {
    // Create a new order
    async createOrder(orderData) {
        try {
            const result = await db('Orders').insert(orderData);
            return result;
        } catch (error) {
            throw error;
        }
    }

    // Get order by ID
    async getOrderById(orderId) {
        try {
            const order = await db('Orders').where('OrderId', orderId).first();
            return order;
        } catch (error) {
            throw error;
        }
    }

    // Update order
    async updateOrder(orderId, updatedOrderData) {
        try {
            const result = await db('Orders').where('OrderId', orderId).update(updatedOrderData);
            return result;
        } catch (error) {
            throw error;
        }
    }

    // Delete order
    async deleteOrder(orderId) {
        try {
            const result = await db('Orders').where('OrderId', orderId).del();
            return result;
        } catch (error) {
            throw error;
        }
    }

    // Get all orders
    async getAllOrders() {
        try {
            const orders = await db('Orders');
            return orders;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = new Order();
