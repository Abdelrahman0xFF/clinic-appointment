import multer from "multer";
import { storage, blogStorage } from "../config/cloudinary.config.js";
import { AppError } from "../utils/AppError.js";

const imageFileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new AppError("Only image files are allowed", 400), false);
    }
};

export const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: imageFileFilter,
});

export const blogUpload = multer({
    storage: blogStorage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: imageFileFilter,
});
