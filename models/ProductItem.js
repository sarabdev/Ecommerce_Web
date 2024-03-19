const db = require('../config/database');

class ProductItem {
    async createProduct(productData) {
        try {
            const result = await db('ProductItems').insert(productData);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getProductById(productId) {
        try {
            const product = await db('ProductItems').where('ProductId', productId).first();
            return product;
        } catch (error) {
            throw error;
        }
    }

    async updateProduct(productId, productData) {
        try {
            const result = await db('ProductItems').where('ProductId', productId).update(productData);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async deleteProduct(productId) {
        try {
            const result = await db('ProductItems').where('ProductId', productId).del();
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getAllProducts() {
        try {
            const products = await db('ProductItems').select('*');
            return products;
        } catch (error) {
            throw error;
        }
    }

    async getProductsByCategory(categoryId) {
        try {
            const products = await db('ProductItems').where('CategoryId', categoryId);
            return products;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ProductItem();
