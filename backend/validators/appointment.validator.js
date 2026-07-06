import Joi from "joi";

export const validateAppointmentForm = (data) => {
    const schema = Joi.object({
        fullName: Joi.string().min(3).max(100).required(),
        phone: Joi.string()
            .pattern(/^01[0125][0-9]{8}$/)
            .required(),
        reason: Joi.string().min(5).max(500).required(),
        date: Joi.string()
            .pattern(/^\d{4}-\d{2}-\d{2}$/)
            .custom((value, helpers) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const inputDate = new Date(value);
                inputDate.setHours(0, 0, 0, 0);
                if (inputDate < today) {
                    return helpers.error("date.past");
                }
                return value;
            })
            .required()
            .messages({ "date.past": "Appointment date cannot be in the past" }),
        time: Joi.string()
            .pattern(/^([01]\d|2[0-3]):?([0-5]\d)$/)
            .required(),
        receiptFile: Joi.any().optional(),
    });
    return schema.validate(data);
};

export const validateRescheduleAppointment = (data) => {
    const schema = Joi.object({
        fullName: Joi.string().min(3).max(100).required(),
        phone: Joi.string()
            .pattern(/^01[0125][0-9]{8}$/)
            .required(),
        date: Joi.string()
            .pattern(/^\d{4}-\d{2}-\d{2}$/)
            .custom((value, helpers) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const inputDate = new Date(value);
                inputDate.setHours(0, 0, 0, 0);
                if (inputDate < today) {
                    return helpers.error("date.past");
                }
                return value;
            })
            .required()
            .messages({ "date.past": "Appointment date cannot be in the past" }),
        time: Joi.string()
            .pattern(/^([01]\d|2[0-3]):?([0-5]\d)$/)
            .required(),
    });
    return schema.validate(data);
};

export const validateUpdateAppointment = (data) => {
    const schema = Joi.object({
        status: Joi.string()
            .valid("pending", "approved", "rejected")
            .required(),
    });
    return schema.validate(data);
};
