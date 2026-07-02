import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import router from "./routes/router.js";
import { connectDB } from "./config/db.config.js";
import { morganMiddleware } from "./middlewares/logger.middleware.js";

dotenv.config();

await connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morganMiddleware);

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.use("/api", router);

app.listen(3000, () => {
    console.log("running on http://localhost:3000");
});
