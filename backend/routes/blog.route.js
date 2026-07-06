import { Router } from "express";
import {
    createBlogPost,
    getBlogPosts,
    getBlogPostById,
    updateBlogPost,
    deleteBlogPost,
} from "../controllers/blog.controller.js";
import {
    protectAdminRoute,
    optionalAuth,
} from "../middlewares/auth.middleware.js";
import { validateRequest } from "../middlewares/validate.middleware.js";
import { blogUpload } from "../middlewares/upload.middleware.js";
import {
    validateBlogPost,
    validateBlogPostUpdate,
} from "../validators/blog.validator.js";

const router = Router();

router.get("/", optionalAuth, getBlogPosts);
router.get("/:id", optionalAuth, getBlogPostById);

router.post(
    "/",
    protectAdminRoute,
    blogUpload.single("coverImage"),
    validateRequest(validateBlogPost),
    createBlogPost,
);
router.put(
    "/:id",
    protectAdminRoute,
    blogUpload.single("coverImage"),
    validateRequest(validateBlogPostUpdate),
    updateBlogPost,
);
router.delete("/:id", protectAdminRoute, deleteBlogPost);

export default router;
