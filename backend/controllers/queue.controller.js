import { QueueEntry } from "../models/queue.model.js";
import { Appointment } from "../models/appointment.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";

export const getLiveQueue = asyncHandler(async (req, res, next) => {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
    const skip = (page - 1) * limit;

    const [queue, total] = await Promise.all([
        QueueEntry.find()
            .skip(skip)
            .limit(limit)
            .populate({
                path: "appointmentId",
                select: "time patientId",
                populate: { path: "patientId", select: "fullName" },
            })
            .sort({ createdAt: 1 }),
        QueueEntry.countDocuments(),
    ]);

    return res.status(200).json({
        success: true,
        data: queue,
        total,
        page,
        totalPages: Math.ceil(total / limit),
    });
});

export const updateQueueStage = asyncHandler(async (req, res, next) => {
    const entry = await QueueEntry.findByIdAndUpdate(
        req.params.id,
        { stage: req.body.stage },
        { new: true },
    );

    if (!entry) {
        return next(new AppError("Queue entry not found", 404));
    }

    if (req.body.stage === "completed" && entry.appointmentId) {
        await Appointment.findByIdAndUpdate(entry.appointmentId, { status: "completed" });
    }

    return res.status(200).json({
        success: true,
        message: `Patient moved to ${req.body.stage}`,
        data: entry,
    });
});
