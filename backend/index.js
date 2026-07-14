import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import router from "./routes/router.js";
import cors from "cors";
import { connectDB } from "./config/db.config.js";
import { cloudinaryConfig } from "./config/cloudinary.config.js";
import { twilioConfig } from "./config/twilio.config.js";
import { limiter } from "./utils/rateLimiter.js";
import { morganMiddleware } from "./middlewares/logger.middleware.js";
import { errorHandler } from "./utils/errorHandler.js";

dotenv.config();

await connectDB();
cloudinaryConfig();
twilioConfig();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morganMiddleware);
app.use(limiter);

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.use("/api", router);

app.use(errorHandler);

app.listen(3000, () => {
    console.log("running on http://localhost:3000");
});
