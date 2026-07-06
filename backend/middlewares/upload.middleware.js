import multer from "multer";
import { storage, blogStorage } from "../config/cloudinary.config.js";

export const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
});

export const blogUpload = multer({
    storage: blogStorage,
    limits: { fileSize: 5 * 1024 * 1024 },
});
