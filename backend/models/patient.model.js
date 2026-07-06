import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true, trim: true },
        phone: { type: String, required: true, trim: true, unique: true },
    },
    { timestamps: true },
);

export const Patient = mongoose.model("Patient", patientSchema);
