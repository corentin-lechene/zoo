import { Request, Response } from "express";
import { EmployeeService } from "../service";
import { ResponseUtil } from "../util";
import {RoleEnum} from "../entity";
import {ZooService} from "../service/zoo.service";

export class ZooController {
    public static async canOpen(req: Request, res: Response): Promise<void> {
        const employees = await EmployeeService.fetchEmployeeWhoWorks();

        if (employees.length === 0) {
            return ResponseUtil.badRequest(res, 'No Employee');
        }

        const requiredRoles: RoleEnum[] = [
            RoleEnum.VETERINARIAN,
            RoleEnum.HEALER,
            RoleEnum.CLEANER,
            RoleEnum.RECEPTIONIST,
            RoleEnum.SELLER
        ];

        const missingRoles: RoleEnum[] = requiredRoles.filter(reqRole => !employees.some(employee => employee.roles.find(role => role.name === reqRole)));
        console.log("missingRoles: ", missingRoles);
        if (missingRoles.length > 0) {
            return ResponseUtil.badRequest(res, 'Not enough employees');
        }

        const zoo = await ZooService.fetchZoo();
        if(!zoo) {
            return ResponseUtil.badRequest(res, 'no zoo');
        }
        zoo.open = true;
        await ZooService.update(zoo);

        ResponseUtil.ok(res);
    }

    public static async closed(req: Request, res: Response): Promise<void> {
        try {
            const zoo = await ZooService.fetchZoo();
            if(!zoo) {
                return ResponseUtil.badRequest(res, 'no zoo');
            }
            zoo.open = false;
            await ZooService.update(zoo);
            ResponseUtil.ok(res);
        } catch(e) {
            console.error(e);
            ResponseUtil.serverError(res);
        }
    }
}