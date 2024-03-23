const db = require('../config/database');

class OrderDetail {
    // Create a new order detail
    async createOrderDetail(orderDetailData) {
        try {
            const result = await db('OrderDetails').insert(orderDetailData);
            return result;
        } catch (error) {
            throw error;
        }
    }

    // Get order detail by ID
    async getOrderDetailById(orderDetailId) {
        try {
            const orderDetail = await db('OrderDetails').where('OrderDetailId', orderDetailId).first();
            return orderDetail;
        } catch (error) {
            throw error;
        }
    }

    // Update order detail
    async updateOrderDetail(orderDetailId, updatedOrderDetailData) {
        try {
            const result = await db('OrderDetails').where('OrderDetailId', orderDetailId).update(updatedOrderDetailData);
            return result;
        } catch (error) {
            throw error;
        }
    }

    // Delete order detail
    async deleteOrderDetail(orderDetailId) {
        try {
            const result = await db('OrderDetails').where('OrderDetailId', orderDetailId).del();
            return result;
        } catch (error) {
            throw error;
        }
    }

    // Get all order details for a specific order
    async getOrderDetailsByOrderId(orderId) {
        try {
            const orderDetails = await db('OrderDetails').where('OrderId', orderId);
            return orderDetails;
        } catch (error) {
            throw error;
        }
    }

    // Get all order details for a specific product
    async getOrderDetailsByProductId(productId) {
        try {
            const orderDetails = await db('OrderDetails').where('ProductId', productId);
            return orderDetails;
        } catch (error) {
            throw error;
        }
    }

    // Get all order details
    async getAllOrderDetails() {
        try {
            const orderDetails = await db('OrderDetails');
            return orderDetails;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = new OrderDetail();
