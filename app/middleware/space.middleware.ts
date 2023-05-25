import {Request, RequestHandler} from "express";
import {ResponseUtil} from "../util";
import {SpaceStatus, TypeEnum} from "../entity";

export function checkBody(): RequestHandler {
    return async function (req: Request, res, next) {
        //Check si tous les champs sont remplis
        if(!req.body['name'] || !req.body['description'] || !req.body['image'] || !req.body['capacity'] ||
            !req.body['type'] || !req.body['openingTime'] || !req.body['closureHour'] ||
            !req.body['accessHandicap'] || !req.body['status']) {
            return ResponseUtil.missingAttribute(res);
        }

        //Check les types
        if(typeof req.body['name'] !== "string" || typeof req.body['description'] !== "string" ||
            typeof req.body['image'] !== "string" || typeof req.body['capacity'] !== "number" ||
            typeof req.body['type'] !== "string" || typeof req.body['openingTime'] !== "string" ||
            typeof req.body['closureHour'] !== "string" || typeof req.body['accessHandicap'] !== "boolean" ||
            typeof req.body['status'] !== "string") {
            return ResponseUtil.badRequest(res);
        }

        //Check si type et status contient bien les enumérations
        if(!(req.body['type'] === TypeEnum.COURSE || req.body['type'] === TypeEnum.FREE_EXPOSITION) ||
            !(req.body['status'] === SpaceStatus.OPEN || req.body['status'] === SpaceStatus.CLOSED ||
                req.body['status'] === SpaceStatus.UNDER_MAINTENANCE)){
            return ResponseUtil.badRequest(res);
        }

        //TODO :check le bon format des dates
        next();
    }
}