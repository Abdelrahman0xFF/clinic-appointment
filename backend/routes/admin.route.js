import { Router } from "express";

import {
    login,
    getAdminProfile,
    logout,
} from "../controllers/admin.controller.js";
import { protectAdminRoute } from "../middlewares/auth.middleware.js";
import { validateAdminLogin } from "../validators/admin.validator.js";

export const router = Router();

router.post("/login", validateAdminLogin, login);
router.get("/profile", protectAdminRoute, getAdminProfile);
router.post("/logout", protectAdminRoute, logout);

export default router;
