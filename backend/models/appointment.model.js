import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: true,
        },
        reason: { type: String, required: true },
        date: { type: String, required: true },
        time: { type: String, required: true },
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },
        receiptImageUrl: { type: String, required: true },
        checkedIn: { type: Boolean, default: false },
    },
    { timestamps: true },
);

export const Appointment = mongoose.model("Appointment", appointmentSchema);
