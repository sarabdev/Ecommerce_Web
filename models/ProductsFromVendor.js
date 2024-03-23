const db = require('../config/database');

class ProductsFromVendors {
    async addProductFromVendor(productData) {
        try {
            const result = await db('ProductsFromVendors').insert(productData);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getProductFromVendor(productId, vendorId) {
        try {
            const product = await db('ProductsFromVendors')
                .where('ProductId', productId)
                .andWhere('VendorId', vendorId)
                .first();
            return product;
        } catch (error) {
            throw error;
        }
    }

    async updateProductFromVendor(productId, vendorId, productData) {
        try {
            const result = await db('ProductsFromVendors')
                .where('ProductId', productId)
                .andWhere('VendorId', vendorId)
                .update(productData);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async deleteProductFromVendor(productId, vendorId) {
        try {
            const result = await db('ProductsFromVendors')
                .where('ProductId', productId)
                .andWhere('VendorId', vendorId)
                .del();
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getAllProductsFromVendor(vendorId) {
        try {
            const products = await db('ProductsFromVendors').where('VendorId', vendorId);
            return products;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ProductsFromVendors();
