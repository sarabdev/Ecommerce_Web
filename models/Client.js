const db = require('../config/database');

class Client {
    async createNewClient(clientData) {
        const result = await db.promise().query('INSERT INTO ClientInfo SET ?', clientData);
        return result;
    }
    
    async getClientByUsername(username) {
        const [client] = await db.promise().query('SELECT * FROM ClientInfo WHERE Username = ?', [username]);
        return client;
    }

    async getClientByEmail(email) {
        const [client] = await db.promise().query('SELECT * FROM ClientInfo WHERE Email = ?', [email]);
        return client;
    }

    async getClientById(clientId) {
        const [client] = await db.promise().query('SELECT * FROM ClientInfo WHERE ClientId = ?', [clientId]);
        return client;
    }
}

module.exports = new Client();