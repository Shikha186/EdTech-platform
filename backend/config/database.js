const mongoose = require('mongoose');
require('dotenv').config();


exports.connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};