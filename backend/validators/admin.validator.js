import Joi from "joi";

export const validateAdminCreation = (data) => {
    const schema = Joi.object({
        username: Joi.string().required().trim().min(3).max(30),
        password: Joi.string()
            .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
            .required()
            .messages({
                "string.pattern.base":
                    "Password must be at least 8 characters long and contain at least one letter and one number.",
            }),
    });
    return schema.validate(data);
};

export const validateAdminLogin = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    return schema.validate(data);
};
