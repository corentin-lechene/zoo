import { Request, RequestHandler } from "express";
import { ResponseUtil } from "../util";
import { Employee, RoleEnum } from "../entity";
import {EmployeeService} from "../service";
import JwtUtil from "../util/jwt.util";

declare module 'express' {
    export interface Request {
        user?: Employee;
    }
}


export function checkUserToken(): RequestHandler {
    return async (req: Request, res, next) => {
        const authorization = req.header("Authorization");
        if(!authorization) {
            return ResponseUtil.unauthorized(res);
        }

        const split = authorization.split(" ");
        if(split.length !== 2 || split[0] !== 'Bearer' || !split[1]) {
            return ResponseUtil.unauthorized(res);
        }

        const token = split[1];
        const user = await EmployeeService.fetchByToken(token);
        if(!user) {
            return ResponseUtil.unauthorized(res);
        }

        if (JwtUtil.isTokenExpired(user.token)) {
            return ResponseUtil.badRequest(res, "Token Expired");
        }

        req.user = user;
        next();
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

        next();
    };
}
