import { Router } from "express";

import {
    login,
    getAdminProfile,
    logout,
    createAdmin,
} from "../controllers/admin.controller.js";
import { protectAdminRoute } from "../middlewares/auth.middleware.js";
import {
    validateAdminLogin,
    validateAdminCreation,
} from "../validators/admin.validator.js";
import { validateRequest } from "../middlewares/validate.middleware.js";

export const router = Router();

router.post(
    "/create",
    protectAdminRoute,
    validateRequest(validateAdminCreation),
    createAdmin,
);
router.post("/login", validateRequest(validateAdminLogin), login);
router.get("/profile", protectAdminRoute, getAdminProfile);
router.post("/logout", protectAdminRoute, logout);

export default router;
