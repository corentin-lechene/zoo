import {Request, Response} from "express";
import {RoleService, UserService} from "../service";
import {ResponseUtil} from "../util";
import {RoleEnum, User} from "../entity";
import {validate} from "class-validator";

const dayjs = require('../config/dayjs.config');

export class UserController {
    public static async fetchAllUsers(req: Request, res: Response): Promise<void> {
        res.json(await UserService.fetchAll());
    }

    public static async fetchUserByUserId(req: Request, res: Response): Promise<void> {
        const user_id = req.params['user_id'] as unknown as number;
        if(!user_id || user_id < 0) {
            return ResponseUtil.badRequest(res);
        }

        const user = await UserService.fetchById(user_id);
        if(!user) {
            return ResponseUtil.notFound(res);
        }

        res.json(user);
    }

    public static async saveUser(req: Request, res: Response): Promise<void> {
        const { firstname, lastname, email, password, phone_number } =
            req.body as { firstname: string, lastname: string, email: string, password: string, phone_number: string, status: string };
        const birthday = req.body['birthday'] as unknown as string;

        if(!firstname || !lastname || !email || !password || !birthday) {
            return ResponseUtil.missingAttribute(res);
        }

        const user = new User();
        user.firstname = firstname;
        user.lastname = lastname;
        user.roles = [];

        // set default
        const defaultRole = await RoleService.fetchByName(RoleEnum.USER);
        if(!defaultRole) {
            return ResponseUtil.serverError(res, 'Role Cannot Found');
        }

        user.roles = [defaultRole];
        user.status = "PENDING";

        const errors = await validate(user);
        if(errors.length > 0) {
            return ResponseUtil.badRequest(res);
        }

        if(await UserService.fetchByEmail(email) !== null) {
            return ResponseUtil.badRequest(res, "Already Exist");
        }

        const requestSaveUser = await UserService.create(user);
        if(!requestSaveUser) {
            return ResponseUtil.serverError(res);
        }
        res.status(201).json(requestSaveUser);
    }

    public static async updateRoles(req: Request, res: Response): Promise<void> {
        const roles = req.body['roles'] as unknown as number[];
        const user_id = req.params['user_id'] as unknown as number;

        //
        if(!req.user) {
            return ResponseUtil.unauthorized(res);
        }

        if(!roles) {
            return ResponseUtil.missingAttribute(res);
        }

        const user = await UserService.fetchById(user_id);
        if(!user) {
            return ResponseUtil.notFound(res);
        }

        const newRoles = await RoleService.fetchByIds(roles);
        if(roles.length !== newRoles.length) {
            return ResponseUtil.badRequest(res, "Roles Not Found");
        }

        user.roles = newRoles;
        await UserService.update(user);
        ResponseUtil.ok(res);
    }
}