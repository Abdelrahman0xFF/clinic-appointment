import { Clinic } from "../models/clinic.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getClinicInfo = asyncHandler(async (req, res, next) => {
    const clinic = await Clinic.findOne({ tenantId: "main_clinic" });

    if (!clinic) {
        return res
            .status(404)
            .json({ success: false, message: "Clinic not configured yet" });
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
