import {Request, RequestHandler} from "express";
import {ResponseUtil} from "../util";
import {Animal} from "../entity";

export function checkTrackingBookBody(): RequestHandler {
    return async function (req: Request, res, next){
        //Check si tous les champs sont remplis
        if(!req.body['treatmentDate'] || !req.body['animal']) {
            return ResponseUtil.missingAttribute(res);
        }

        //Check les types
        if(typeof req.body['treatmentDescription'] !== "string" || !isDate(req.body['treatmentDate']) ||
            !(req.body['animal'] instanceof Animal)) {
            return ResponseUtil.badRequest(res);
        }
    }
}

function isDate(dateString: string): boolean {
    return !isNaN(Date.parse(dateString));
}