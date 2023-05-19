import {Request, RequestHandler} from "express";
import {ResponseUtil} from "../util";
import * as dayjs from "dayjs";

export function checkBody(): RequestHandler {
    return async function (req: Request, res, next) {
        //Check si tous les champs sont remplis
        if(!req.body['spaceName'] || !req.body['description'] ||
            !req.body['startDateMaintenance'] || !req.body['finishDateMaintenance']) {
            return ResponseUtil.missingAttribute(res);
        }

        //Check les types
        if(typeof req.body['spaceName'] !== "string" || typeof req.body['description'] !== "string" ||
            typeof req.body['startDateMaintenance'] !== "string" ||
            typeof req.body['finishDateMaintenance'] !== "string") {
            return ResponseUtil.badRequest(res);
        }

        //Check le bon format des dates
        if(!dayjs(req.body['startDateMaintenance'], "YYYY-MM-DD").isValid() ||
            !dayjs(req.body['finishDateMaintenance'], "YYYY-MM-DD").isValid()){
            return ResponseUtil.badRequest(res);
        }
        next();
    }
}