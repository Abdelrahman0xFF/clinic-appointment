import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

export const cloudinaryConfig = () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
    } catch (error) {
        console.log(error);
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
