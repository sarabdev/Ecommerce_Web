const orderDetailModel = require('../models/OrderDetail');
const orderModel = require('../models/Order');
const productModel = require('../models/ProductItem');

// Controller for handling order detail-related operations

// Create a new order detail
exports.createOrderDetail = async (req, res) => {
    try {
        const orderDetailData = req.body;
        const result = await orderDetailModel.createOrderDetail(orderDetailData);
        const orderDetailId = result[0];
        const orderDetail = await orderDetailModel.getOrderDetailById(orderDetailId);
        if (!orderDetail) {
            return res.status(404).json({ message: 'Order detail not found' });
        }
        const order = await orderModel.getOrderById(orderDetail.OrderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        const product = await productModel.getProductById(orderDetail.ProductId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(201).json({ 
            message: 'Order detail created successfully', 
            orderDetail: {
                orderDetailId: orderDetail.OrderDetailId,
                order: order,
                product: product,
                quantity: orderDetail.Quantity
            }
        });
    } catch (error) {
        console.error('Error creating order detail:', error);
        res.status(500).json({ message: 'Failed to create order detail' });
    }
};

// Get order detail by ID
exports.getOrderDetailById = async (req, res) => {
    try {
        const { orderDetailId } = req.params;
        const orderDetail = await orderDetailModel.getOrderDetailById(orderDetailId);
        if (!orderDetail) {
            return res.status(404).json({ message: 'Order detail not found' });
        }
        const order = await orderModel.getOrderById(orderDetail.OrderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        const product = await productModel.getProductById(orderDetail.ProductId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ 
            orderDetail: {
                orderDetailId: orderDetail.OrderDetailId,
                order: order,
                product: product,
                quantity: orderDetail.Quantity
            }
        });
    } catch (error) {
        console.error('Error getting order detail by ID:', error);
        res.status(500).json({ message: 'Failed to retrieve order detail' });
    }
};

// Update order detail
exports.updateOrderDetail = async (req, res) => {
    try {
        const { orderDetailId } = req.params;
        const updatedOrderDetailData = req.body;
        const result = await orderDetailModel.updateOrderDetail(orderDetailId, updatedOrderDetailData);
        if (result === 0) {
            return res.status(404).json({ message: 'Order detail not found' });
        }
        res.status(200).json({ message: 'Order detail updated successfully' });
    } catch (error) {
        console.error('Error updating order detail:', error);
        res.status(500).json({ message: 'Failed to update order detail' });
    }
};

// Delete order detail
exports.deleteOrderDetail = async (req, res) => {
    try {
        const { orderDetailId } = req.params;
        const result = await orderDetailModel.deleteOrderDetail(orderDetailId);
        if (result === 0) {
            return res.status(404).json({ message: 'Order detail not found' });
        }
        res.status(200).json({ message: 'Order detail deleted successfully' });
    } catch (error) {
        console.error('Error deleting order detail:', error);
        res.status(500).json({ message: 'Failed to delete order detail' });
    }
};

// Get all order details for a specific order
exports.getOrderDetailsByOrderId = async (req, res) => {
    try {
        const { orderId } = req.params;
        const orderDetails = await orderDetailModel.getOrderDetailsByOrderId(orderId);
        res.status(200).json(orderDetails);
    } catch (error) {
        console.error('Error getting order details by order ID:', error);
        res.status(500).json({ message: 'Failed to retrieve order details' });
    }
};

// Get all order details for a specific product
exports.getOrderDetailsByProductId = async (req, res) => {
    try {
        const { productId } = req.params;
        const orderDetails = await orderDetailModel.getOrderDetailsByProductId(productId);
        res.status(200).json(orderDetails);
    } catch (error) {
        console.error('Error getting order details by product ID:', error);
        res.status(500).json({ message: 'Failed to retrieve order details' });
    }
};

// Get all order details
exports.getAllOrderDetails = async (req, res) => {
    try {
        const orderDetails = await orderDetailModel.getAllOrderDetails();
        const orderDetailsWithDetails = await Promise.all(orderDetails.map(async orderDetail => {
            const order = await orderModel.getOrderById(orderDetail.OrderId);
            const product = await productModel.getProductById(orderDetail.ProductId);
            return {
                orderDetailId: orderDetail.OrderDetailId,
                order: order,
                product: product,
                quantity: orderDetail.Quantity
            };
        }));
        res.status(200).json(orderDetailsWithDetails);
    } catch (error) {
        console.error('Error getting all order details:', error);
        res.status(500).json({ message: 'Failed to retrieve order details' });
    }
};
