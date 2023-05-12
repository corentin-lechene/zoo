import {Request, Response} from "express";
import {RoleService} from "../service";
import {ResponseUtil} from "../util";

export class RoleController {
    public static async fetchAllRoles(req: Request, res: Response): Promise<void> {
        res.json(await RoleService.fetchAll());
    }

    public static async fetchRoleByRoleId(req: Request, res: Response): Promise<void> {
        const roleId = req.params['role_id'] as unknown as number;
        if(!roleId) {
            return ResponseUtil.missingAttribute(res);
        }

        const role = await RoleService.fetchById(roleId);
        if(!role) {
            return ResponseUtil.notFound(res);
        }

        res.json(role);
    }

    public static async delete(req: Request, res: Response): Promise<void> {
        const roleId = req.params['role_id'] as unknown as number;
        if(!roleId) {
            return ResponseUtil.missingAttribute(res);
        }

        const role = await RoleService.fetchById(roleId);
        if(!role) {
            return ResponseUtil.notFound(res);
        }

        const result = await RoleService.delete(role);
        if(result.raw !== 1) {
            return ResponseUtil.somethingWentWrong(res);
        }

        ResponseUtil.ok(res);
    }

}