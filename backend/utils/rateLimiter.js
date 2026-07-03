import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 30,
    skip: (req) => req.method === "GET",
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message:
            "Too many requests from this IP, please try again after 15 minutes",
    },
});
