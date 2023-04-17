import winston from "winston";

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    // defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.Console({
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

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        level: 'debug',
        format: winston.format.cli(),
    }));
}

export { logger };