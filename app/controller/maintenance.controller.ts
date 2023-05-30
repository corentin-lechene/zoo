import {Request, Response} from "express";
import {SpaceService} from "../service";
import {ResponseUtil} from "../util";
import * as dayjs from "dayjs";
import {MaintenanceService} from "../service/maintenance.service";
import {Maintenance} from "../entity";

export class MaintenanceController {
    public static async fetchAllMaintenances(req: Request, res: Response): Promise<void> {
        res.json(await MaintenanceService.fetchAll());
    }

    public static async fetchMaintenanceById(req: Request, res: Response): Promise<void> {
        res.status(200).json(req.maintenance);
    }

    public static async createMaintenance(req: Request, res: Response): Promise<void> {
        const space = await SpaceService.fetchByName(req.body['spaceName']);
        if(!space) return ResponseUtil.notFound(res);

        const newMaintenance= MaintenanceController.createMaintenanceModel(req);
        newMaintenance.space = space;
        await MaintenanceService.create(newMaintenance);
        ResponseUtil.created(res);
    }

    public static async updateMaintenance(req: Request, res: Response): Promise<void> {
        if(!req.maintenance) return ResponseUtil.notFound(res);
        const space = await SpaceService.fetchByName(req.body['spaceName']);
        if(!space) return ResponseUtil.notFound(res);

        const updatedMaintenance  = await MaintenanceController.createMaintenanceModel(req);
        updatedMaintenance.id = req.maintenance.id;
        await MaintenanceService.update(updatedMaintenance);
        ResponseUtil.ok(res);
    }

    public static async deleteMaintenance(req: Request, res: Response):Promise<void> {
        if(!req.maintenance) return ResponseUtil.notFound(res);
        await MaintenanceService.delete(req.maintenance);
        ResponseUtil.ok(res);
    }

    private static createMaintenanceModel(req: Request) {
        const description: string = req.body['description'];
        const startDateMaintenance: Date = req.body['startDateMaintenance'];
        const finishDateMaintenance: Date = req.body['finishDateMaintenance'];

        const newMaintenance = new Maintenance();
        newMaintenance.description = description;
        newMaintenance.startDateMaintenance = dayjs(startDateMaintenance).toDate();
        newMaintenance.finishDateMaintenance = dayjs(finishDateMaintenance).toDate();
        return newMaintenance;
    }
}