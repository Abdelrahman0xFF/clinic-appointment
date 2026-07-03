import { Appointment } from "../models/appointment.model.js";
import { Patient } from "../models/patient.model.js";
import { QueueEntry } from "../models/queue.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";

export const createAppointment = asyncHandler(async (req, res, next) => {
    const { fullName, phone, reason, date, time } = req.body;

    let receiptImageUrl = null;
    if (req.file && req.file.path) {
        receiptImageUrl = req.file.path;
    }

    let patient = await Patient.findOne({ phone });
    if (!patient) {
        patient = await Patient.create({ fullName, phone });
    }

    const newAppointment = await Appointment.create({
        patientId: patient._id,
        reason,
        date,
        time,
        receiptImageUrl,
        status: "pending",
    });

    return res.status(201).json({
        success: true,
        message: "Appointment request submitted",
        data: newAppointment,
    });
});

export const getAppointments = asyncHandler(async (req, res, next) => {
    const filter = req.query.date ? { date: req.query.date } : {};

    const appointments = await Appointment.find(filter)
        .populate("patientId", "fullName phone")
        .sort({ date: 1, time: 1 });

    return res.status(200).json({ success: true, data: appointments });
});

export const getPatientAppointments = asyncHandler(async (req, res, next) => {
    const { phone, fullName } = req.params;
    const patient = await Patient.findOne({ phone, fullName: fullName.trim() });
    if (!patient) {
        return next(new AppError("Patient not found", 404));
    }

    const appointments = await Appointment.find({
        patientId: patient._id,
    }).sort({ date: 1, time: 1 });

    return res.status(200).json({ success: true, data: appointments });
});

export const updateAppointmentStatus = asyncHandler(async (req, res, next) => {
    const appointment = await Appointment.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true },
    );

    if (!appointment) {
        return next(new AppError("Appointment not found", 404));
    }

    return res.status(200).json({
        success: true,
        message: `Appointment ${req.body.status}`,
        data: appointment,
    });
});

export const checkInAppointment = asyncHandler(async (req, res, next) => {
    const appointment = await Appointment.findByIdAndUpdate(
        req.params.id,
        { checkedIn: true },
        { new: true },
    );

    if (!appointment) {
        return next(new AppError("Appointment not found", 404));
    }

    const queueEntry = await QueueEntry.create({
        appointmentId: appointment._id,
        time: new Date().toLocaleTimeString("en-US", {
            hour12: false,
            hour: "numeric",
            minute: "numeric",
        }),
        stage: "waiting",
    });

    return res.status(200).json({
        success: true,
        message: "Patient checked in and added to queue",
        data: { appointment, queueEntry },
    });
});
