import winston from "winston"
import __dirname from "../src/utils.js"
import config from "../src/config.js"

const customLevelOptions = {
    levels: {
        debug: 0,
        http: 1,
        info: 2,
        warning: 3,
        error: 4,
        fatal: 5
    },
    colors: {
        debug: "white",
        http:"green",
        info: "blue",
        warning: "yellow",
        error: "red",
        fatal: "bgred",
    }
}




export let logger

switch (config.devMODE) {
    case "devlogger":
        const devlogger = winston.createLogger({
            levels: customLevelOptions.levels,
            transports:[
                new winston.transports.Console({
                    level:"debug",
                    format: winston.format.combine(
                        winston.format.colorize({colors:customLevelOptions.colors}),
                        winston.format.simple()
                    )
                })
            ]
        })
        logger = devlogger
        break;

    case "prodlogger":
        const prodlogger = winston.createLogger({
            levels: customLevelOptions.levels,
            transports:[
                new winston.transports.Console({
                    level:"info",
                    format: winston.format.combine(
                        winston.format.colorize({colors:customLevelOptions.colors}),
                        winston.format.simple()
                    )
                }),
                new winston.transports.File({
                    filename: `${__dirname}/../logs/errors.log`,
                    level:"error",
                    format: winston.format.combine(
                        winston.format.colorize({colors:customLevelOptions.colors}),
                        winston.format.simple()
                    )
                }),
            ]
        })

        logger = prodlogger
        break;
}

