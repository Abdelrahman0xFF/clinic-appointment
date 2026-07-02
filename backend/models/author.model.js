import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        title: { type: String, required: true },
        bio: { type: String, required: true },
        avatarUrl: { type: String, required: true },
        credentials: { type: String },
    },
    { timestamps: true },
);

export const Author = mongoose.model("Author", authorSchema);
