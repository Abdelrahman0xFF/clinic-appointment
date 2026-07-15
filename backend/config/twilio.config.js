import twilio from "twilio";
import { logger } from "../utils/logger.js";

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
        logger.error(`Failed to initialize Twilio client: ${error.message}`);
    }
};
