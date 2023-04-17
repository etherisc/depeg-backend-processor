import winston from "winston";

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    // defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.Console({
            level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
            format: winston.format.cli(),
        })
        // new winston.transports.File({ 
        //     filename: 'application.log',
        //     format: winston.format.combine(
        //         winston.format.timestamp({
        //             format: "YYYY-MM-DD HH:mm:ss",
        //         }),
        //         winston.format.json()
        //     ),
        // }),
    ],
});

export { logger };
