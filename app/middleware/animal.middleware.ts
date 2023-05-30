import { Request, RequestHandler } from "express";
import { ResponseUtil } from "../util";
import * as dayjs from "dayjs";
export function checkAnimalBody(): RequestHandler {
    return async function (req: Request, res, next) {
        // Vérifier si tous les champs sont remplis
        if (!req.body['name'] || !req.body['birthDate'] || !req.body['specieId'] || !req.body['spaceId']) {
            return ResponseUtil.missingAttribute(res);
        }

        if (typeof req.body['name'] !== 'string' || !dayjs(req.body['birthDate'], "YYYY-MM-DD").isValid() || typeof req.body['specieId'] !== 'number'
            || typeof req.body['spaceId'] !== 'number') {
            return ResponseUtil.badRequest(res, 'Date');
        }

        next();
    };
}

