import { BlogPost } from "../models/blog.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createBlogPost = asyncHandler(async (req, res, next) => {
    const newPost = await BlogPost.create(req.body);
    return res.status(201).json({
        success: true,
        message: "Blog post created successfully",
        data: newPost,
    });
});

export const getBlogPosts = asyncHandler(async (req, res, next) => {
    const filter = req.query.status ? { status: req.query.status } : {};
    const posts = await BlogPost.find(filter).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: posts });
});

export const getBlogPostBySlug = asyncHandler(async (req, res, next) => {
    const post = await BlogPost.findOne({ slug: req.params.slug });
    if (!post) {
        return res
            .status(404)
            .json({ success: false, message: "Blog post not found" });
    }
    return res.status(200).json({ success: true, data: post });
});

export const updateBlogPost = asyncHandler(async (req, res, next) => {
    const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    if (!post) {
        return res
            .status(404)
            .json({ success: false, message: "Blog post not found" });
    }
    return res
        .status(200)
        .json({ success: true, message: "Blog post updated", data: post });
});

export const deleteBlogPost = asyncHandler(async (req, res, next) => {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) {
        return res
            .status(404)
            .json({ success: false, message: "Blog post not found" });
    }
    return res
        .status(200)
        .json({ success: true, message: "Blog post deleted" });
});
