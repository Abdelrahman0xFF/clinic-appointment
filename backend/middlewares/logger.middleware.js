import morgan from "morgan";
import { logger } from "../utils/logger.js";

const morganFormat =
    ":method :url :status :res[content-length] - :response-time ms";

export const morganMiddleware = morgan(morganFormat, {
    stream: {
        write: (message) => logger.info(message.trim()),
    },
});
