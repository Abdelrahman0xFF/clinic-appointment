import { Router } from "express";

import {
    getClinicInfo,
    updateClinicInfo,
} from "../controllers/clinic.controller.js";
import { validateClinicUpdate } from "../validators/clinic.validator.js";

import { protectAdminRoute } from "../middlewares/auth.middleware.js";
import { validateRequest } from "../middlewares/validate.middleware.js";

const router = Router();

router.get("/", getClinicInfo);
router.put(
    "/",
    protectAdminRoute,
    validateRequest(validateClinicUpdate),
    updateClinicInfo,
);

export default router;
