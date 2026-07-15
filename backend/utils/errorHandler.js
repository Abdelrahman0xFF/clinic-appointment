import { logger } from "./logger.js";

export const errorHandler = async (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    
    if (statusCode >= 500) {
        logger.error(`[${req.method}] ${req.originalUrl} - ${message}\n${err.stack}`);
    } else {
        logger.warn(`[${req.method}] ${req.originalUrl} - ${statusCode} - ${message}`);
    }

    res.status(statusCode).json({
        success: false,
        message: message,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
};
