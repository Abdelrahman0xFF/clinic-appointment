import { Clinic } from "../models/clinic.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";

export const getClinicInfo = asyncHandler(async (req, res, next) => {
    const clinic = await Clinic.findOne({ tenantId: "main_clinic" });

    if (!clinic) {
        return next(new AppError("Clinic not configured yet", 404));
    }

    return res.status(200).json({ success: true, data: clinic });
});

export const updateClinicInfo = asyncHandler(async (req, res, next) => {
    const updatedClinic = await Clinic.findOneAndUpdate(
        { tenantId: "main_clinic" },
        { $set: req.body },
        { new: true, upsert: true, runValidators: true },
    );

    return res.status(200).json({
        success: true,
        message: "Clinic settings updated successfully",
        data: updatedClinic,
    });
});
