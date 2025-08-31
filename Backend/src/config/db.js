import mongoose from 'mongoose';
import logger from './logger.js';
import {env} from "./env.js"

export const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(env.MONGO_URI);
        logger.info(`MongoDB connected:${conn.connection.host}`);
    }
    catch(error){
        logger.error(`Error:${error.message}`);
        process.exit(1);
    }
}
