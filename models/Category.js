const db = require('../config/database');

class Category {
    async createCategory(categoryData) {
        try {
            const result = await db('Categories').insert(categoryData);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async createBulkCategories(categoriesData) {
        try {
            const result = await db('Categories').insert(categoriesData);
            return result;
        } catch (error) {
            throw error;
        }
    }
    
    async getCategoryById(categoryId) {
        try {
            const category = await db('Categories').where('CategoryId', categoryId).first();
            return category;
        } catch (error) {
            throw error;
        }
    }

    async updateCategory(categoryId, categoryData) {
        try {
            const result = await db('Categories').where('CategoryId', categoryId).update(categoryData);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async deleteCategory(categoryId) {
        try {
            const result = await db('Categories').where('CategoryId', categoryId).del();
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getAllCategories() {
        try {
            const categories = await db('Categories').select('*');
            return categories;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new Category();
