import mongoose from "mongoose";

const tocSchema = new mongoose.Schema(
    {
        id: { type: String, required: true },
        label: { type: String, required: true },
        level: { type: Number, required: true },
    },
    { _id: false },
);

const faqSchema = new mongoose.Schema(
    {
        question: { type: String, required: true },
        answer: { type: String, required: true },
    },
    { _id: false },
);

const blogPostSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        excerpt: { type: String, required: true },
        category: { type: String, required: true },
        coverImageUrl: { type: String, required: true },
        content: { type: String, required: true },
        author: { type: String, required: true },
        date: { type: String, required: true },
        readTimeMinutes: { type: Number, required: true },
        tableOfContents: [tocSchema], // embedded arr
        faqs: [faqSchema], // embedded arr
        status: {
            type: String,
            enum: ["published", "draft"],
            default: "draft",
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: (_doc, ret) => { delete ret._id; delete ret.__v; return ret; },
        },
    },
);

blogPostSchema.index({ status: 1, createdAt: -1 });

export const BlogPost = mongoose.model("BlogPost", blogPostSchema);
