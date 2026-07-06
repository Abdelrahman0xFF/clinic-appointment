import { Admin } from "../models/admin.model.js";
import { Appointment } from "../models/appointment.model.js";
import { QueueEntry } from "../models/queue.model.js";
import { verifyPassword } from "../utils/encryption.js";
import { generateToken } from "../utils/jwt.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";

export const createAdmin = asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;
    const existingAdmin = await Admin.findOne({ username });

    if (existingAdmin) {
        return next(new AppError("Admin with this username already exists", 400));
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
        return next(new AppError("Invalid credentials", 401));
    }

    const isMatch = await verifyPassword(password, admin.password);
    if (!isMatch) {
        return next(new AppError("Invalid credentials", 401));
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
        return next(new AppError("Admin not found", 404));
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
        return next(new AppError("Admin not found", 404));
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

export const getDashboardStats = asyncHandler(async (req, res, next) => {
    const todayStr = new Date().toISOString().split("T")[0];

    const [pendingRequests, todayAppointments, activeQueue, completedToday] = await Promise.all([
        Appointment.countDocuments({ status: "pending" }),
        Appointment.countDocuments({ date: todayStr }),
        QueueEntry.countDocuments({ stage: { $ne: "completed" } }),
        Appointment.countDocuments({ status: "completed", date: todayStr })
    ]);

    return res.status(200).json({
        success: true,
        data: {
            pendingRequests,
            todayAppointments,
            activeQueue,
            completedToday
        }
    });
});
