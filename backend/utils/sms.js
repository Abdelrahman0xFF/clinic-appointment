import { client } from "../config/twilio.config.js";

export const sendSMS = async (to, body) => {
    try {
        let formattedTo = to;
        if (formattedTo.startsWith("01") && formattedTo.length === 11) {
            formattedTo = "+20" + formattedTo.substring(1);
        } else if (!formattedTo.startsWith("+")) {
            formattedTo = "+20" + formattedTo.replace(/^0+/, "");
        }

        const message = await client.messages.create({
            body: body,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: formattedTo,
        });

        return message;
    } catch (error) {
        console.error(`Failed to send SMS to ${to}:`, error.message);
    }
};
