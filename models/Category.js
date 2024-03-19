const db = require('../config/database');

class Category {
    async createCategory(categoryData) {
        try {
            const result = await db.promise().query('INSERT INTO Categories SET ?', categoryData);
            return result;
        } catch (error) {
            throw error;
        }
    }
    
    async getCategoryById(categoryId) {
        try {
            const [category] = await db.promise().query('SELECT * FROM Categories WHERE CategoryId = ?', [categoryId]);
            return category;
        } catch (error) {
            throw error;
        }
    }

    async updateCategory(categoryId, categoryData) {
        try {
            const result = await db.promise().query('UPDATE Categories SET ? WHERE CategoryId = ?', [categoryData, categoryId]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async deleteCategory(categoryId) {
        try {
            const result = await db.promise().query('DELETE FROM Categories WHERE CategoryId = ?', [categoryId]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getAllCategories() {
        try {
            const [categories] = await db.promise().query('SELECT * FROM Categories');
            return categories;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new Category();
