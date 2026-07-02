export const validateRequest = (validatorFunction) => {
    return (req, res, next) => {
        const { error, value } = validatorFunction(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }
        req.body = value;
        next();
    };
};
