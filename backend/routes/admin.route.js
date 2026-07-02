import { Router } from "express";

import {
    login,
    getAdminProfile,
    logout,
    createAdmin,
    edit,
} from "../controllers/admin.controller.js";
import { protectAdminRoute } from "../middlewares/auth.middleware.js";
import {
    validateAdminLogin,
    validateAdminCreation,
} from "../validators/admin.validator.js";
import { validateRequest } from "../middlewares/validate.middleware.js";

export const router = Router();

router.get("/", protectAdminRoute, getAdminProfile);
router.post(
    "/",
    protectAdminRoute,
    validateRequest(validateAdminCreation),
    createAdmin,
);
router.put(
    "/",
    protectAdminRoute,
    validateRequest(validateAdminCreation),
    edit,
);
router.post("/login", validateRequest(validateAdminLogin), login);
router.post("/logout", protectAdminRoute, logout);

export default router;
