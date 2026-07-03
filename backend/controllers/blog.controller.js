import { BlogPost } from "../models/blog.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";

export const createBlogPost = asyncHandler(async (req, res, next) => {
    const newPost = await BlogPost.create(req.body);
    return res.status(201).json({
        success: true,
        message: "Blog post created successfully",
        data: newPost,
    });
});

export const getBlogPosts = asyncHandler(async (req, res, next) => {
    let filter = {};

    if (req.adminId) {
        if (req.query.status) {
            filter.status = req.query.status;
        }
    } else {
        filter.status = "published";
    }

    const posts = await BlogPost.find(filter).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: posts });
});

export const getBlogPostBySlug = asyncHandler(async (req, res, next) => {
    const filter = { slug: req.params.slug };
    if (!req.adminId) {
        filter.status = "published";
    }
    const post = await BlogPost.findOne(filter);

    if (!post) {
        return next(new AppError("Blog post not found", 404));
    }
    return res.status(200).json({ success: true, data: post });
});

export const updateBlogPost = asyncHandler(async (req, res, next) => {
    const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    if (!post) {
        return next(new AppError("Blog post not found", 404));
    }
    return res
        .status(200)
        .json({ success: true, message: "Blog post updated", data: post });
});

export const deleteBlogPost = asyncHandler(async (req, res, next) => {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) {
        return next(new AppError("Blog post not found", 404));
    }
    return res
        .status(200)
        .json({ success: true, message: "Blog post deleted" });
});
