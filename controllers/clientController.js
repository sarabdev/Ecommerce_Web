const clientModel = require('../models/Client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

exports.signup = async (req, res) => {
    const { firstName, lastName, email, username, password } = req.body;

    if (!firstName || !lastName || !email || !username || !password) {
        return res.status(400).json({ message: 'First Name, Last Name, Email, Username, and Password are required' });
    }

    try {
        // Check if the email or username already exists in the database
        const clientByEmail = await clientModel.getClientByEmail(email);
        const clientByUsername = await clientModel.getClientByUsername(username);

        if (clientByEmail) {
            return res.status(400).json({ message: 'Email is already registered' });
        }

        if (clientByUsername) {
            return res.status(400).json({ message: 'Username is already taken' });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const clientData = {
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            Username: username,
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
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and Password are required' });
        }

        const client = await clientModel.getClientByEmail(email);

        if (!client) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        
        const passwordMatch = await bcrypt.compare(password, client.PasswordHash);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const jwtSecret = process.env.JWT_SECRET;
        const token = jwt.sign({ clientId: client.ClientId }, jwtSecret, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
    }
};
