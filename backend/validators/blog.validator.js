import Joi from "joi";

export const validateBlogPost = (data) => {
    const schema = Joi.object({
        slug: Joi.string().required(),
        title: Joi.string().required(),
        excerpt: Joi.string().required(),
        category: Joi.string().required(),
        coverImageUrl: Joi.string().uri().required(),
        authorId: Joi.string().hex().length(24).required(),
        date: Joi.string()
            .pattern(/^\d{4}-\d{2}-\d{2}$/)
            .required(),
        readTimeMinutes: Joi.number().integer().min(1).required(),
        tableOfContents: Joi.array().items(
            Joi.object({
                id: Joi.string().required(),
                label: Joi.string().required(),
                level: Joi.number().integer().min(1).max(6).required(),
            }),
        ),
        faqs: Joi.array().items(
            Joi.object({
                question: Joi.string().required(),
                answer: Joi.string().required(),
            }),
        ),
        status: Joi.string().valid("published", "draft").required(),
    });
    return schema.validate(data);
};

export const validateBlogPostUpdate = (data) => {
    const schema = Joi.object({
        slug: Joi.string(),
        title: Joi.string(),
        excerpt: Joi.string(),
        category: Joi.string(),
        coverImageUrl: Joi.string().uri(),
        authorId: Joi.string().hex().length(24),
        date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/),
        readTimeMinutes: Joi.number().integer().min(1),
        tableOfContents: Joi.array().items(
            Joi.object({
                id: Joi.string(),
                label: Joi.string(),
                level: Joi.number().integer().min(1).max(6),
            }),
        ),
        faqs: Joi.array().items(
            Joi.object({
                question: Joi.string(),
                answer: Joi.string(),
            }),
        ),
        status: Joi.string().valid("published", "draft"),
    });
    return schema.validate(data);
};
