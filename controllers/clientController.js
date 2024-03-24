const clientModel = require('../models/Client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

exports.signup = async (req, res) => {
    const { FirstName, LastName, Email, Username, Password } = req.body;

    if (!FirstName || !LastName || !Email || !Username || !Password) {
        return res.status(400).json({ message: 'First Name, Last Name, Email, Username, and Password are required' });
    }

    try {
        // Check if the email or username already exists in the database
        const clientByEmail = await clientModel.getClientByEmail(Email);
        const clientByUsername = await clientModel.getClientByUsername(Username);

        if (clientByEmail) {
            return res.status(400).json({ message: 'Email is already registered' });
        }

        if (clientByUsername) {
            return res.status(400).json({ message: 'Username is already taken' });
        }

        const hashedPassword = await bcrypt.hash(Password, saltRounds);

        const clientData = {
            FirstName,
            LastName,
            Email,
            Username,
            PasswordHash: hashedPassword,
        };

        await clientModel.createNewClient(clientData);
        res.status(201).json({ message: 'Client created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating client' });
    }
};

exports.login = async (req, res) => {
    try {
        const { Email, Password } = req.body;

        if (!Email || !Password) {
            return res.status(400).json({ message: 'Email and Password are required' });
        }

        const client = await clientModel.getClientByEmail(Email);

        if (!client) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        
        const passwordMatch = await bcrypt.compare(Password, client.PasswordHash);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const jwtSecret = process.env.JWT_SECRET;
        const token = jwt.sign({ clientId: client.ClientId }, jwtSecret, { expiresIn: '1d' });

        res.status(200).json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
    }
};

exports.changePassword= async (req, res) => {
    try {
        const { ClientId, OldPassword, NewPassword } = req.body;
        // Validate request
        if (!ClientId || !OldPassword || !NewPassword) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Verify old password
        const client = await clientModel.getClientById(ClientId);
        if (!client) {
            return res.status(404).json({ message: "Client not found" });
        }

        const match = await bcrypt.compare(OldPassword, client.PasswordHash);
        if (!match) {
            return res.status(403).json({ message: "Old password is incorrect" });
        }
        const hashedPassword = await bcrypt.hash(NewPassword, saltRounds);

        // Update password
        await clientModel.changePassword(ClientId, hashedPassword);
        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ message: 'Failed to change password' });
    }
}
