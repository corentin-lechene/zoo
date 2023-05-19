import { Request, RequestHandler } from "express";
import { ResponseUtil } from "../util";
import {Space, Species} from "../entity";
export function checkAnimalBody(): RequestHandler {
    return async function (req: Request, res, next) {
        // Vérifier si tous les champs sont remplis
        if (!req.body['name'] || !req.body['birthDate'] || !req.body['species'] || !req.body['space']) {
            return ResponseUtil.missingAttribute(res);
        }

        // Vérifier les types
        if (typeof req.body['name'] !== 'string' || !isDate(req.body['birthDate']) ||
            !(req.body['species'] instanceof Species) || !(req.body['space'] instanceof Space) ||
            !isDate(req.body['deathDate'])) {
            return ResponseUtil.badRequest(res);
        }

        next();
    };
}

function isDate(dateString: string): boolean {
    return !isNaN(Date.parse(dateString));
}

