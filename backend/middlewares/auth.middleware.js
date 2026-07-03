import { verifyToken } from "../utils/jwt.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const protectAdminRoute = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Not authorized, no token provided",
        });
    }

    const decoded = verifyToken(token);

    req.adminId = decoded.id;
    next();
});

export const optionalAuth = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        try {
            const decoded = verifyToken(token);
            req.adminId = decoded.id;
        } catch (error) {}
    }
    next();
});
