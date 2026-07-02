import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.config.js";

dotenv.config();

await connectDB();

const app = express();

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.listen(3000, () => {
    console.log("running on http://localhost:3000");
});
