import { Appointment } from "../models/appointment.model.js";
import { Patient } from "../models/patient.model.js";
import { QueueEntry } from "../models/queue.model.js";
import { Clinic } from "../models/clinic.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";

export const createAppointment = asyncHandler(async (req, res, next) => {
    const { fullName, phone, reason, date, time } = req.body;

    const existingAppointment = await Appointment.findOne({
        date,
        time,
        status: { $ne: "rejected" }
    });

    if (existingAppointment) {
        return next(new AppError("This time slot is already booked", 400));
    }

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

export const getAvailableTimeSlots = asyncHandler(async (req, res, next) => {
    const { date } = req.query;
    if (!date) {
        return next(new AppError("Date query parameter is required", 400));
    }

    const dateObj = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const requestedDate = new Date(dateObj);
    requestedDate.setHours(0, 0, 0, 0);

    if (requestedDate < today) {
        return res.status(200).json({ success: true, data: [] });
    }

    const isToday = requestedDate.getTime() === today.getTime();

    const days = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
    ];
    const dayOfWeek = days[dateObj.getDay()];

    const clinic = await Clinic.findOne({ tenantId: "main_clinic" });
    if (!clinic) {
        return next(new AppError("Clinic configuration not found", 404));
    }

    const workingHours = clinic.workingHours.get(dayOfWeek);

    if (!workingHours || !workingHours.start || !workingHours.end) {
        return res.status(200).json({ success: true, data: [] });
    }

    const generateTimeSlots = (start, end) => {
        const slots = [];
        let current = new Date(`1970-01-01T${start}:00Z`);
        const endTime = new Date(`1970-01-01T${end}:00Z`);

        while (current < endTime) {
            slots.push(current.toISOString().substring(11, 16));
            current.setMinutes(current.getMinutes() + 30);
        }
        return slots;
    };

    const allTimeSlots = generateTimeSlots(
        workingHours.start,
        workingHours.end,
    );

    const appointments = await Appointment.find({
        date,
        status: { $ne: "rejected" },
    });

    const bookedTimes = appointments.map((appt) => appt.time);

    const now = new Date();
    const currentTimeString = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    const availableTimeSlots = allTimeSlots.filter((time) => {
        if (bookedTimes.includes(time)) return false;
        if (isToday && time < currentTimeString) return false;
        return true;
    });

    return res.status(200).json({ success: true, data: availableTimeSlots });
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
