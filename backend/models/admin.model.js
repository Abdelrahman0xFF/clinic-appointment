import mongoose from "mongoose";
import { hashPassword, verifyPassword } from "../utils/encryption.js";

const adminSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: { type: String, required: true },
    },
    { timestamps: true },
);

adminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        this.password = await hashPassword(this.password);
        next();
    } catch (error) {
        next(error);
    }
});

adminSchema.methods.comparePassword = async function (candidatePassword) {
    return await verifyPassword(candidatePassword, this.password);
};

export const Admin = mongoose.model("Admin", adminSchema);
