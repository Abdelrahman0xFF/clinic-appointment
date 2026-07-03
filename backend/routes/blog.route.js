import { Router } from "express";
import {
    createBlogPost,
    getBlogPosts,
    getBlogPostBySlug,
    updateBlogPost,
    deleteBlogPost,
} from "../controllers/blog.controller.js";
import { protectAdminRoute } from "../middlewares/auth.middleware.js";
import { validateRequest } from "../middlewares/validate.middleware.js";
import {
    validateBlogPost,
    validateBlogPostUpdate,
} from "../validators/blog.validator.js";

const router = Router();

router.get("/", getBlogPosts);
router.get("/:slug", getBlogPostBySlug);

router.post(
    "/",
    protectAdminRoute,
    validateRequest(validateBlogPost),
    createBlogPost,
);
router.put(
    "/:id",
    protectAdminRoute,
    validateRequest(validateBlogPostUpdate),
    updateBlogPost,
);
router.delete("/:id", protectAdminRoute, deleteBlogPost);

export default router;
