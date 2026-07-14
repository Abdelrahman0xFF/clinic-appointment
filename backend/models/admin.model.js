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
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: (_doc, ret) => { delete ret._id; delete ret.__v; return ret; },
        },
    },
);

adminSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await hashPassword(this.password);
});

adminSchema.methods.comparePassword = async function (candidatePassword) {
    return await verifyPassword(candidatePassword, this.password);
};

export const Admin = mongoose.model("Admin", adminSchema);
