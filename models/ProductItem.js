const db = require('../config/database');

class ProductItem {
    async createProduct(productData) {
        try {
            const result = await db.promise().query('INSERT INTO ProductItems SET ?', productData);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getProductById(productId) {
        try {
            const [product] = await db.promise().query('SELECT * FROM ProductItems WHERE ProductId = ?', [productId]);
            return product;
        } catch (error) {
            throw error;
        }
    }

    async updateProduct(productId, productData) {
        try {
            const result = await db.promise().query('UPDATE ProductItems SET ? WHERE ProductId = ?', [productData, productId]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async deleteProduct(productId) {
        try {
            const result = await db.promise().query('DELETE FROM ProductItems WHERE ProductId = ?', [productId]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getAllProducts() {
        try {
            const [products] = await db.promise().query('SELECT * FROM ProductItems');
            return products;
        } catch (error) {
            throw error;
        }
    }

    async getProductsByCategory(categoryId) {
        try {
            const [products] = await db.promise().query('SELECT * FROM ProductItems WHERE CategoryId = ?', [categoryId]);
            return products;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ProductItem();
