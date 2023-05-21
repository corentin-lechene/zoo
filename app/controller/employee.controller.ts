import {Request, Response} from "express";
import {RoleService, EmployeeService} from "../service";
import {ResponseUtil} from "../util";
import {Employee, EmployeeStatus} from "../entity";
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
        const { firstname, lastname, password, role } =
            req.body as { firstname: string, lastname: string, password: string, role: string };

        if(!firstname || !lastname || !password || !role) {
            return ResponseUtil.missingAttribute(res);
        }

        // fetch role
        const defaultRole = await RoleService.fetchByName(role.toUpperCase());
        if(!defaultRole) {
            return ResponseUtil.serverError(res, 'Role Cannot Found');
        }

        const user = new Employee();
        user.firstname = firstname.toLowerCase();
        user.lastname = lastname.toLowerCase();
        user.password = await PwdUtil.hash(password);
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

    static async updateStatus(req: Request, res: Response): Promise<void> {
        const employee_id = req.params['employee_id'] as unknown as number;
        const status = req.body['status'] as unknown as string;

        if(!employee_id || !status) {
            return ResponseUtil.missingAttribute(res);
        }

        if(!Object.keys(EmployeeStatus).some(s => s === status)) {
            return ResponseUtil.invalidAttributes(res);
        }

        const employee = await EmployeeService.fetchById(employee_id);
        if(!employee) {
            return ResponseUtil.notFound(res);
        }

        employee.status = status as EmployeeStatus;
        await EmployeeService.update(employee);
        ResponseUtil.ok(res);
    }
}