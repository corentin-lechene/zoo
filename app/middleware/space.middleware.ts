import {Request, RequestHandler} from "express";
import {ResponseUtil} from "../util";
import {Space, SpaceStatus, TypeEnum} from "../entity";
import {SpaceService} from "../service";

declare module 'express' {
    export interface Request {
        space?: Space;
    }
}
export function checkBody(): RequestHandler {
    return async function (req: Request, res, next) {
        //Check si tous les champs sont remplis
        if(!req.body['name'] || !req.body['description'] || !req.body['image'] || !req.body['capacity'] ||
            !req.body['type'] || !req.body['openingTime'] || !req.body['closureHour'] ||
            typeof req.body['accessHandicap'] != "boolean" || !req.body['status']) {
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

        next();
    }
}

export function checkBodyManageSpace(): RequestHandler {
    return async function (req: Request, res, next) {
        //Check si tous les champs sont remplis
        if(!req.params['space_id'] || !req.body['ticket_id']) {
            return ResponseUtil.missingAttribute(res);
        }

        //Check le type
        if(typeof req.body['ticket_id'] != "number") {
            return ResponseUtil.badRequest(res);
        }
        next();
    }
}

export function checkIfSpaceExist(): RequestHandler {
    return  async function(req: Request, res, next){
        const spaceId = req.params['space_id'] as unknown as number;
        if (!spaceId) return ResponseUtil.missingAttribute(res);

        const space = await SpaceService.fetchById(spaceId);
        if(!space) return ResponseUtil.notFound(res);
        req.space = space;
        next();
    }
}