const express = require('express');
const router = express.Router();
const productFromVendorController = require('../controllers/productsFromVendorController');

// Add a product from a vendor
router.post('/', productFromVendorController.addProductFromVendor);

// Get a product from a vendor by product ID and vendor ID
router.get('/:productId/:vendorId', productFromVendorController.getProductFromVendor);

// Update a product from a vendor by product ID and vendor ID
router.put('/:productId/:vendorId', productFromVendorController.updateProductFromVendor);

// Delete a product from a vendor by product ID and vendor ID
router.delete('/:productId/:vendorId', productFromVendorController.deleteProductFromVendor);

// Get all products from a specific vendor
router.get('/vendor/:vendorId', productFromVendorController.getAllProductsFromVendor);

module.exports = router;
