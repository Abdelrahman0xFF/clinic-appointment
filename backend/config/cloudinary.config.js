import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { logger } from "../utils/logger.js";

export const cloudinaryConfig = () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
    } catch (error) {
        logger.error(`Cloudinary config failed: ${error.message}`);
    }
};

export const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "clinic_receipts",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
        transformation: [{ width: 800, crop: "limit" }],
    },
});

export const blogStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "blog_covers",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
        transformation: [{ width: 1200, crop: "limit" }],
    },
});
