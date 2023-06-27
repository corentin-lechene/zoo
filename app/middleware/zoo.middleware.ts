import { Request, RequestHandler } from "express";
import { ResponseUtil } from "../util";
import {ZooService} from "../service/zoo.service";
export function isZooOpened(): RequestHandler {
    return async function (req: Request, res, next) {
        const zoo = await ZooService.fetchZoo();
        if(!zoo) {
            return ResponseUtil.serverError(res, 'zoo uncreated');
        }

        // const openAt = dayjs(zoo.openAt, 'HH:mm');
        // const closedAt = dayjs(zoo.closedAt, 'HH:mm');

        if(!zoo.open) {
            return ResponseUtil.badRequest(res, 'zoo not open');
        }
        next();
    };
}

