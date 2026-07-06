import twilio from "twilio";

export let client;

export const twilioConfig = () => {
    try {
        if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
            client = twilio(
                process.env.TWILIO_ACCOUNT_SID,
                process.env.TWILIO_AUTH_TOKEN,
            );
        }
    } catch (error) {
        console.error("Failed to initialize Twilio client", error);
    }
};
