import mongoose from 'mongoose';
import { DB_URI } from '../config/env.js';

if(!DB_URI){
    throw new Error('Please define the MONGO_DB URI environment variable inside the .env.<development>.local');
};

const connectToDB= async () => {
    try {
        await mongoose.connect(DB_URI);
        mongoose.connection.on('disconnected', () => {
           console.log('MongoDB disconnected!');
        });
        mongoose.connection.on('error', (err) => {
           console.error('MongoDB connection error:', err.message);
        });

        console.log(`Connection to database in: ${process.env.NODE_ENV} mode.`)
    } catch(error){
        console.log('Error connecting to database!');
        process.exit(1);
    }
};

export default connectToDB;