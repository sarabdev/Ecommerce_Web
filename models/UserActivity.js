const db = require('../config/database');

class UserActivity {
    async addUserActivity(activityData) {
        try {
            const result = await db('UserActivity').insert(activityData);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getUserActivityByClientId(clientId) {
        try {
            const activities = await db('UserActivity').where('ClientId', clientId).select('*');
            return activities;
        } catch (error) {
            throw error;
        }
    }

    async getAllUserActivities() {
        try {
            const activities = await db('UserActivity').select('*');
            return activities;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new UserActivity();
