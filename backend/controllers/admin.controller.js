import { Admin } from "../models/admin.model.js";
import { verifyPassword } from "../utils/encryption.js";
import { generateToken } from "../utils/jwt.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createAdmin = asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;
    const existingAdmin = await Admin.findOne({ username });

    if (existingAdmin) {
        return res.status(400).json({
            success: false,
            message: "Admin with this username already exists",
        });
    }

    const admin = new Admin({ username, password });
    await admin.save();
    const token = generateToken({ id: admin._id });

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
        success: true,
        message: "Admin created successfully",
        data: {
            admin: { username: admin.username },
        },
    });
});

export const login = asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });
    if (!admin) {
        return res
            .status(401)
            .json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await verifyPassword(password, admin.password);
    if (!isMatch) {
        return res
            .status(401)
            .json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken({ id: admin._id });

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
            admin: { username: admin.username },
        },
    });
});

export const edit = asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;
    const admin = await Admin.findById(req.adminId);
    if (!admin) {
        return res
            .status(404)
            .json({ success: false, message: "Admin not found" });
    }

    admin.username = username;
    admin.password = password;
    await admin.save();

    return res.status(200).json({
        success: true,
        message: "Admin updated successfully",
        data: {
            admin: { username: admin.username },
        },
    });
});

export const getAdminProfile = asyncHandler(async (req, res, next) => {
    const admin = await Admin.findById(req.adminId).select("-password");

    if (!admin) {
        return res
            .status(404)
            .json({ success: false, message: "Admin not found" });
    }

    return res.status(200).json({ success: true, data: admin });
});

export const logout = asyncHandler(async (req, res, next) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
    });

    return res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
});
