import env from './validateEnv.config.js';
import mongoose from 'mongoose';

const uri: string = env.MONGODB_URI;

async function connectDb() {
    try {
        const client = await mongoose.connect(uri + `/${env.NODE_ENV}`);
        console.log('Connected to MongoDB', client.connection.name);
        return true;
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        throw error;
    }
}

export { connectDb };