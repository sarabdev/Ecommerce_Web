const db = require('../config/database');

class Client {
    async createNewClient(clientData) {
        try {
            const result = await db('ClientInfo').insert(clientData);
            return result;
        } catch (error) {
            throw error;
        }
    }
    
    async getClientByUsername(username) {
        try {
            const client = await db('ClientInfo').where('Username', username).first();
            return client;
        } catch (error) {
            throw error;
        }
    }

    async getClientByEmail(email) {
        try {
            const client = await db('ClientInfo').where('Email', email).first();
            return client;
        } catch (error) {
            throw error;
        }
    }

    async getClientById(clientId) {
        try {
            const client = await db('ClientInfo').where('ClientId', clientId).first();
            return client;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new Client();
