import {Request, RequestHandler} from "express";
import {ResponseUtil} from "../util";
import {Animal} from "../entity";
import * as dayjs from "dayjs";

export function checkTrackingBookBody(): RequestHandler {
    return async function (req: Request, res, next){
        //Check si tous les champs sont remplis
        if(!req.body['treatmentDate'] || !req.body['animal']) {
            return ResponseUtil.missingAttribute(res);
        }

        //Check les types
        if(typeof req.body['treatmentDescription'] !== "string" || !dayjs(req.body['treatmentDate'], "YYYY-MM-DD").isValid()||
            !(req.body['animal'] instanceof Animal)) {
            return ResponseUtil.badRequest(res);
        }
        next();
    }
}