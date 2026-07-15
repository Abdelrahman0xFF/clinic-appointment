import mongoose from "mongoose";
import { logger } from "../utils/logger.js";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        logger.info("Connected to MongoDB");
    } catch (error) {
        logger.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

export const disconnectDB = async () => {
    await mongoose.disconnect();
    logger.info("Disconnected from MongoDB");
};
