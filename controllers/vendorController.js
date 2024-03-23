const Vendor = require('../models/Vendor');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET;

exports.signup = async (req, res) => {
    const { VendorName, ContactName, Phone, Email, Address1, Address2, City, State, PostalCode, Country, Password } = req.body;

    if (!VendorName || !Email || !Password) {
        return res.status(400).json({ message: 'Vendor Name, Email, and Password are required' });
    }

    try {
        // Check if the vendor with the email already exists in the database
        const existingVendor = await Vendor.getVendorByEmail(Email);
        if (existingVendor) {
            return res.status(400).json({ message: 'Vendor with this email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(Password, saltRounds);

        // Create vendor data object
        const vendorData = {
            VendorName,
            ContactName,
            Phone,
            Email,
            Address1,
            Address2,
            City,
            State,
            PostalCode,
            Country,
            PasswordHash: hashedPassword
        };

        // Create vendor in the database
        await Vendor.createVendor(vendorData);

        res.status(201).json({ message: 'Vendor signed up successfully' });
    } catch (error) {
        console.error('Error signing up vendor:', error);
        res.status(500).json({ message: 'Failed to sign up vendor' });
    }
};

exports.login = async (req, res) => {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
        return res.status(400).json({ message: 'Email and Password are required' });
    }

    try {
        // Check if vendor with the email exists
        const vendor = await Vendor.getVendorByEmail(Email);
        if (!vendor) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(Password, vendor.PasswordHash);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Create JWT token
        const token = jwt.sign({ vendorId: vendor.VendorId }, jwtSecret, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error('Error logging in vendor:', error);
        res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
    }
};
