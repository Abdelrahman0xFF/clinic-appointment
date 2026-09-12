import { logger } from "./logger.js";

const sendWhatsAppMessage = async (to, message) => {
  try {
    const baseUrl = process.env.WHATSAPP_API_URL?.replace(/\/+$/, "");
    const apiUrl = `${baseUrl}/api/messages/send`;
    const apiKey = process.env.WHATSAPP_API_KEY;

    const cleanNumber = to ? to.toString().replace(/^\+/, "").trim() : "";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        number: cleanNumber,
        message: message,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    logger.error("Error sending WhatsApp message:", error);
  }
};

export { sendWhatsAppMessage };
