import { Router } from "express";
import { upload } from "../middlewares/upload.middleware.js";

import {
    createAppointment,
    getAppointments,
    getPatientAppointments,
    updateAppointmentStatus,
    checkInAppointment,
    getAvailableTimeSlots,
} from "../controllers/appointment.controller.js";
import {
    validateAppointmentForm,
    validateUpdateAppintment,
} from "../validators/appointment.validator.js";

import { protectAdminRoute } from "../middlewares/auth.middleware.js";
import { validateRequest } from "../middlewares/validate.middleware.js";

export const router = Router();

router.get("/", protectAdminRoute, getAppointments);
router.get("/slots", getAvailableTimeSlots);
router.get("/:phone/:fullName", getPatientAppointments);
router.post(
    "/",
    upload.single("receiptFile"),
    validateRequest(validateAppointmentForm),
    createAppointment,
);
router.put(
    "/:id",
    protectAdminRoute,
    validateRequest(validateUpdateAppintment),
    updateAppointmentStatus,
);
router.put("/:id/checkin", protectAdminRoute, checkInAppointment);

export default router;
