import { QueueEntry } from "../models/queue.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getLiveQueue = asyncHandler(async (req, res, next) => {
    const queue = await QueueEntry.find({ stage: { $ne: "completed" } })
        .populate({
            path: "appointmentId",
            select: "time patientId",
            populate: { path: "patientId", select: "fullName" },
        })
        .sort({ createdAt: 1 });

    return res.status(200).json({ success: true, data: queue });
});

export const updateQueueStage = asyncHandler(async (req, res, next) => {
    const entry = await QueueEntry.findByIdAndUpdate(
        req.params.id,
        { stage: req.body.stage },
        { new: true },
    );

    if (!entry) {
        return res
            .status(404)
            .json({ success: false, message: "Queue entry not found" });
    }

    return res.status(200).json({
        success: true,
        message: `Patient moved to ${req.body.stage}`,
        data: entry,
    });
});
