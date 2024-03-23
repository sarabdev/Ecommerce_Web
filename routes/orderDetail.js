const express = require('express');
const router = express.Router();
const orderDetailController = require('../controllers/orderDetailsController');

// Route for creating a new order detail
router.post('/', orderDetailController.createOrderDetail);

// Route for getting an order detail by ID
router.get('/:orderDetailId', orderDetailController.getOrderDetailById);

// Route for updating an order detail by ID
router.put('/:orderDetailId', orderDetailController.updateOrderDetail);

// Route for deleting an order detail by ID
router.delete('/:orderDetailId', orderDetailController.deleteOrderDetail);

// Route for getting all order details for a specific order
router.get('/order/:orderId', orderDetailController.getOrderDetailsByOrderId);

// Route for getting all order details for a specific product
router.get('/product/:productId', orderDetailController.getOrderDetailsByProductId);

// Route for getting all order details
router.get('/', orderDetailController.getAllOrderDetails);

module.exports = router;
