const ProductItem = require('../models/ProductItem');

exports.createProduct = async (req, res) => {
    try {
        const productData = req.body;
        const result = await ProductItem.createProduct(productData);
        res.status(201).json({ message: 'Product created successfully', productId: result.insertId });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Failed to create product' });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await ProductItem.getProductById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error('Error getting product by ID:', error);
        res.status(500).json({ message: 'Failed to retrieve product' });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const productData = req.body;
        const result = await ProductItem.updateProduct(productId, productData);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Failed to update product' });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const result = await ProductItem.deleteProduct(productId);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Failed to delete product' });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await ProductItem.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        console.error('Error getting all products:', error);
        res.status(500).json({ message: 'Failed to retrieve products' });
    }
};

exports.getProductsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const products = await ProductItem.getProductsByCategory(categoryId);
        res.status(200).json(products);
    } catch (error) {
        console.error('Error getting products by category:', error);
        res.status(500).json({ message: 'Failed to retrieve products by category' });
    }
};
