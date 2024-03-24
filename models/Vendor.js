const db = require('../config/database');

class Vendor {
    async createVendor(vendorData) {
        try {
            const result = await db('VendorInfo').insert(vendorData);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getVendorById(vendorId) {
        try {
            const vendor = await db('VendorInfo').where('VendorId', vendorId).first();
            return vendor;
        } catch (error) {
            throw error;
        }
    }

    async getVendorByEmail(email) {
        try {
            const vendor = await db('VendorInfo').where('Email', email).first();
            return vendor;
        } catch (error) {
            throw error;
        }
    }

    async changePassword(vendorId, hashedPassword) {
        try {
            const result = await db('VendorInfo').where('VendorId', vendorId).update({ PasswordHash: hashedPassword });
            return result;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = new Vendor();
