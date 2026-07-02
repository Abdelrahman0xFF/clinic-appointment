import { Router } from "express";
import adminRouter from "./admin.route.js";
import clinicRouter from "./clinic.route.js";

const router = Router();

router.use("/admin", adminRouter);
router.use("/clinic", clinicRouter);

export default router;
