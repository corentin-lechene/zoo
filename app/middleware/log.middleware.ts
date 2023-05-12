import * as chalk from "chalk";
import {RequestHandler} from "express";


export function logRoute(): RequestHandler {
    return (req, res, next) => {
        const start = Date.now();

        res.on('finish', () => {
            const elapsed = Date.now() - start;
            const textColor = res.locals.routeNotExists as boolean ? chalk.red : chalk.white;
            console.log(textColor(`[${req.method}] ${textColor.underline(req.originalUrl)} => ${res.statusCode} in ${textColor.italic(elapsed + 'ms')}`));
        });

        next();
    }
}