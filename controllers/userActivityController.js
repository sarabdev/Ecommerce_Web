const userActivityModel = require('../models/UserActivity');
const clientModel = require('../models/Client');

exports.addUserActivity = async (req, res) => {
    try {
        const { clientId, activityType, activityDate } = req.body;

        // Check if the client exists
        const client = await clientModel.getClientById(clientId);
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        const activityData = {
            ClientId: clientId,
            ActivityType: activityType,
            ActivityDate: activityDate
        };

        const result = await userActivityModel.addUserActivity(activityData);
        res.status(201).json({ message: 'User activity added successfully', activityId: result.insertId });
    } catch (error) {
        console.error('Error adding user activity:', error);
        res.status(500).json({ message: 'Failed to add user activity' });
    }
};

exports.getUserActivityByClientId = async (req, res) => {
    try {
        const { clientId } = req.params;

        // Check if the client exists
        const client = await clientModel.getClientById(clientId);
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        const activities = await userActivityModel.getUserActivityByClientId(clientId);
        
        // Attach client info to each activity
        const activitiesWithClientInfo = activities.map(activity => {
            return {
                ...activity,
                client
            };
        });

        res.status(200).json(activitiesWithClientInfo);
    } catch (error) {
        console.error('Error getting user activities:', error);
        res.status(500).json({ message: 'Failed to retrieve user activities' });
    }
};

exports.getAllUserActivities = async (req, res) => {
    try {
        const activities = await userActivityModel.getAllUserActivities();
        
        // Fetch client info for each activity
        const activitiesWithClientInfo = await Promise.all(activities.map(async activity => {
            const client = await clientModel.getClientById(activity.ClientId);
            return {
                ...activity,
                client
            };
        }));

        res.status(200).json(activitiesWithClientInfo);
    } catch (error) {
        console.error('Error getting all user activities:', error);
        res.status(500).json({ message: 'Failed to retrieve user activities' });
    }
};
