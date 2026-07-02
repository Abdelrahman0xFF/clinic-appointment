import Joi from "joi";

export const validateAppointmentForm = (data) => {
    const schema = Joi.object({
        fullName: Joi.string().min(3).max(100).required(),
        phone: Joi.string()
            .pattern(/^01[0125][0-9]{8}$/) // egy phone
            .required(),
        reason: Joi.string().min(5).max(500).required(),
        date: Joi.string()
            .pattern(/^\d{4}-\d{2}-\d{2}$/)
            .required(), // YYYY-MM-DD
        time: Joi.string()
            .pattern(/^([01]\d|2[0-3]):?([0-5]\d)$/)
            .required(), // HH:MM
        receiptFile: Joi.any().optional(),
    });
    return schema.validate(data);
};

export const validateUpdateAppintment = (data) => {
    const schema = Joi.object({
        status: Joi.string()
            .valid("pending", "approved", "rejected")
            .required(),
    });
    return schema.validate(data);
};
