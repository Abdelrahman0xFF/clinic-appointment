import { Router } from "express";
import adminRouter from "./admin.route.js";
import clinicRouter from "./clinic.route.js";
import appointmentRouter from "./appointment.route.js";
import queueRouter from "./queue.route.js";

const router = Router();

router.use("/admin", adminRouter);
router.use("/clinic", clinicRouter);
router.use("/appointment", appointmentRouter);
router.use("/queue", queueRouter);

export default router;
