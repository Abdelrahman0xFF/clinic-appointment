import { Router } from "express";

import {
    getLiveQueue,
    updateQueueStage,
} from "../controllers/queue.controller.js";
import { validateQueueUpdate } from "../validators/queue.validator.js";

import { protectAdminRoute } from "../middlewares/auth.middleware.js";
import { validateRequest } from "../middlewares/validate.middleware.js";

export const router = Router();

router.get("/", protectAdminRoute, getLiveQueue);
router.put(
    "/:id",
    protectAdminRoute,
    validateRequest(validateQueueUpdate),
    updateQueueStage,
);

export default router;
