import { Request, RequestHandler } from "express";
import { ResponseUtil } from "../util";
import { UserService } from "../service";
import { RoleEnum, User } from "../entity";

declare module 'express' {
    export interface Request {
        user?: User;
    }
}

export function checkUserRoles(names: RoleEnum[]): RequestHandler {
    return async function (req: Request, res, next) {
        if (!req.user) {
            return ResponseUtil.unauthorized(res);
        }

        if (!req.user.roles.some((role) => names.some((name) => RoleEnum[name] === role.name))) {
            return ResponseUtil.forbidden(res);
        }

        if (!req.user.roles.some((role) => role.name === RoleEnum.VETERINARIAN)) {
            return ResponseUtil.forbidden(res);
        }

        next();
    };
}
