import {Request, RequestHandler} from "express";
import {ResponseUtil} from "../util";

export function checkSpeciesBody(): RequestHandler {
    return async function (req: Request, res, next){
        //Check si tous les champs sont remplis
        if(!req.body['name'] || !req.body['origin']) {
            return ResponseUtil.missingAttribute(res);
        }

        //Check les types
        if(typeof req.body['name'] !== "string" || typeof req.body['origin'] !== "string") {
            return ResponseUtil.badRequest(res);
        }
    }
}