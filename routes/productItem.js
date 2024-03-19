const express = require('express');
const router = express.Router();
const productController = require('../controllers/productItemController');

router.post('/', productController.createProduct);

router.get('/:productId', productController.getProductById);

router.put('/:productId', productController.updateProduct);

router.delete('/:productId', productController.deleteProduct);

router.get('/', productController.getAllProducts);

router.get('/category/:categoryId', productController.getProductsByCategory);

module.exports = router;
