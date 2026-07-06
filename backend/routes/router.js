import { Router } from "express";
import adminRouter from "./admin.route.js";
import clinicRouter from "./clinic.route.js";
import appointmentRouter from "./appointment.route.js";
import queueRouter from "./queue.route.js";
import blogRouter from "./blog.route.js";

const router = Router();

router.get("/health", (req, res) => {
    res.json({ success: true, status: "ok", timestamp: new Date().toISOString() });
});

router.use("/admin", adminRouter);
router.use("/clinic", clinicRouter);
router.use("/appointment", appointmentRouter);
router.use("/queue", queueRouter);
router.use("/blog", blogRouter);

export default router;
