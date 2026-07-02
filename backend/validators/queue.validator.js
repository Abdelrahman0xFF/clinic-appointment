import Joi from "joi";

export const validateQueueUpdate = (data) => {
    const schema = Joi.object({
        stage: Joi.string()
            .valid("waiting", "in_consultation", "completed")
            .required(),
    });
    return schema.validate(data);
};
