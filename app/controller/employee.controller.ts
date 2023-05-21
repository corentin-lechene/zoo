import {Request, Response} from "express";
import {RoleService, EmployeeService} from "../service";
import {ResponseUtil} from "../util";
import {RoleEnum, Employee} from "../entity";
import {validate} from "class-validator";
import PwdUtil from "../util/pwd.util";


export class EmployeeController {
    public static async fetchAllEmployees(req: Request, res: Response): Promise<void> {
        res.json(await EmployeeService.fetchAll());
    }

    public static async fetchEmployeeByEmployeeId(req: Request, res: Response): Promise<void> {
        const user_id = req.params['user_id'] as unknown as number;
        if(!user_id || user_id < 0) {
            return ResponseUtil.badRequest(res);
        }

        const user = await EmployeeService.fetchById(user_id);
        if(!user) {
            return ResponseUtil.notFound(res);
        }

        res.json(user);
    }

    public static async saveEmployee(req: Request, res: Response): Promise<void> {
        const { firstname, lastname, password, status } =
            req.body as { firstname: string, lastname: string, password: string, status: string };
        const birthday = req.body['birthday'] as unknown as string;

        if(!firstname || !lastname || !password || !birthday) {
            return ResponseUtil.missingAttribute(res);
        }

        const user = new Employee();
        user.firstname = firstname;
        user.lastname = lastname;
        user.password = await PwdUtil.hash(password);
        user.roles = [];

        // set default
        const defaultRole = await RoleService.fetchByName(RoleEnum[status.toUpperCase() as keyof typeof RoleEnum]);
        if(!defaultRole) {
            return ResponseUtil.serverError(res, 'Role Cannot Found');
        }

        user.roles = [defaultRole];

        const errors = await validate(user);
        if(errors.length > 0) {
            return ResponseUtil.badRequest(res);
        }

        const requestSaveEmployee = await EmployeeService.create(user);
        if(!requestSaveEmployee) {
            return ResponseUtil.serverError(res);
        }
        res.status(201).json(requestSaveEmployee);
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

        const user = await EmployeeService.fetchById(user_id);
        if(!user) {
            return ResponseUtil.notFound(res);
        }

        const newRoles = await RoleService.fetchByIds(roles);
        if(roles.length !== newRoles.length) {
            return ResponseUtil.badRequest(res, "Roles Not Found");
        }

        user.roles = newRoles;
        await EmployeeService.update(user);
        ResponseUtil.ok(res);
    }
}