const ProductsFromVendors = require('../models/ProductsFromVendor');
const Vendor = require('../models/Vendor');

exports.addProductFromVendor = async (req, res) => {
    try {
        const { productId, vendorId, price, quantityAvailable } = req.body;
        // Check if the vendor exists
        const vendor = await Vendor.getVendorById(vendorId);
        console.log(vendor)
        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }

        const productData = {
            ProductId: productId,
            VendorId: vendorId,
            Price:price,
            QuantityAvailable:quantityAvailable
        };
        
        const result = await ProductsFromVendors.addProductFromVendor(productData);
        res.status(201).json({ message: 'Product added from vendor successfully', productId: result.insertId});
    } catch (error) {
        console.error('Error adding product from vendor:', error);
        res.status(500).json({ message: 'Failed to add product from vendor' });
    }
};

exports.addBulkProductsFromVendors = async (req, res) => {
    try {
        const productsData = req.body;
        const results = await ProductsFromVendors.addBulkProductsFromVendors(productsData);
        res.status(201).json({ message: 'Bulk products added from vendors successfully', productIds: results });
    } catch (error) {
        console.error('Error adding bulk products from vendors:', error);
        res.status(500).json({ message: 'Failed to add bulk products from vendors' });
    }
};

exports.getProductFromVendor = async (req, res) => {
    try {
        const { productId, vendorId } = req.params;
        const product = await ProductsFromVendors.getProductFromVendor(productId, vendorId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found for this vendor' });
        }

        const vendor = await Vendor.getVendorById(vendorId);
        res.status(200).json({ product, vendor });
    } catch (error) {
        console.error('Error getting product from vendor:', error);
        res.status(500).json({ message: 'Failed to retrieve product from vendor' });
    }
};

exports.updateProductFromVendor = async (req, res) => {
    try {
        const { productId, vendorId } = req.params;
        const productData = req.body;

        // Check if the vendor exists
        const vendor = await Vendor.getVendorById(vendorId);
        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }

        const result = await ProductsFromVendors.updateProductFromVendor(productId, vendorId, productData);
        if (result === 0) {
            return res.status(404).json({ message: 'Product not found for this vendor' });
        }
        res.status(200).json({ message: 'Product from vendor updated successfully' });
    } catch (error) {
        console.error('Error updating product from vendor:', error);
        res.status(500).json({ message: 'Failed to update product from vendor' });
    }
};

exports.deleteProductFromVendor = async (req, res) => {
    try {
        const { productId, vendorId } = req.params;

        const result = await ProductsFromVendors.deleteProductFromVendor(productId, vendorId);
        if (result === 0) {
            return res.status(404).json({ message: 'Product not found for this vendor' });
        }
        res.status(200).json({ message: 'Product from vendor deleted successfully' });
    } catch (error) {
        console.error('Error deleting product from vendor:', error);
        res.status(500).json({ message: 'Failed to delete product from vendor' });
    }
};

exports.getAllProductsFromVendor = async (req, res) => {
    try {
        const { vendorId } = req.params;
        const products = await ProductsFromVendors.getAllProductsFromVendor(vendorId);

        // Get vendor details
        const vendor = await Vendor.getVendorById(vendorId);

        res.status(200).json({ products, vendor });
    } catch (error) {
        console.error('Error getting all products from vendor:', error);
        res.status(500).json({ message: 'Failed to retrieve products from vendor' });
    }
};
