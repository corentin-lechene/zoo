import {RequestHandler} from "express";

export function undefinedRoute(): RequestHandler {
    return (req, res) => {
        res.locals.routeNotExists = true;
        res.status(404).end();
    }
}