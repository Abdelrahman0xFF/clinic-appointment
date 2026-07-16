import winston from "winston";

const { combine, timestamp, printf, colorize } = winston.format;

const consoleFormat = combine(
    colorize({ all: true }),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
);

export const logger = winston.createLogger({
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
    format: combine(timestamp(), winston.format.json()),
    transports: [
        new winston.transports.Console({
            format: consoleFormat,
        }),
        ...(process.env.NODE_ENV !== "production"
            ? [
                  new winston.transports.File({
                      filename: "logs/error.log",
                      level: "error",
                  }),
                  new winston.transports.File({
                      filename: "logs/combined.log",
                  }),
              ]
            : []),
    ],
});
