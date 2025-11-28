// seeder.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./authentication/models/User');
require('dotenv').config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected ✅');

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: 'admin@nccp.com' });
        if (existingAdmin) {
            console.log('Admin already exists 👌');
            mongoose.disconnect();
            return;
        }

        const admin = new User({
            username: 'Admin User',
            email: 'admin@nccp.com',
            password: 'admin@123',
            role: 'admin',
        });

        await admin.save();
        console.log('✅ Admin created successfully');
        mongoose.disconnect();
    } catch (error) {
        console.error('❌ Error creating admin:', error);
        mongoose.disconnect();
    }
};

seedAdmin();
