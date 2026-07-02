import mongoose from "mongoose";

const queueEntrySchema = new mongoose.Schema(
    {
        appointmentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Appointment",
            required: true,
        },
        time: { type: String, required: true },
        stage: {
            type: String,
            enum: ["waiting", "in_consultation", "completed"],
            default: "waiting",
        },
    },
    { timestamps: true },
);

export const QueueEntry = mongoose.model("QueueEntry", queueEntrySchema);
