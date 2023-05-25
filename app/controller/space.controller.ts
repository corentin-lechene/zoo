import {Request, Response} from "express";
import {SpaceService} from "../service";
import {ResponseUtil} from "../util";
import {Space, SpaceStatus} from "../entity";
import * as dayjs from "dayjs";
import {MaintenanceService} from "../service/maintenance.service";

export class SpaceController {
    public static async fetchAllSpaces(req: Request, res: Response): Promise<void> {
        res.json(await SpaceService.fetchAll());
    }

    public static async fetchSpaceById(req: Request, res: Response): Promise<void> {
        const spaceId = req.params['space_id'] as unknown as number;
        if (!spaceId){
            return ResponseUtil.missingAttribute(res);
        }

        const space = await SpaceService.fetchById(spaceId);
        if(!space){
            return ResponseUtil.notFound(res);
        }

        res.status(200).json(space);
    }

    public static async createSpace(req: Request, res: Response): Promise<void> {
        const space = await SpaceService.fetchByName(req.body['name']);
        if(space) return ResponseUtil.alreadyExist(res);

        const newSpace  = SpaceController.createModelSpace(req);
        await SpaceService.create(newSpace);
        ResponseUtil.created(res);
    }

    public static async updateSpace(req: Request, res: Response): Promise<void> {
        const spaceId = req.params['space_id'] as unknown as number;
        if (!spaceId){
            return ResponseUtil.missingAttribute(res);
        }

        const space = await SpaceService.fetchById(spaceId);
        if(!space) return ResponseUtil.notFound(res);

        const updatedSpace  = SpaceController.createModelSpace(req);
        updatedSpace.id = space.id;
        await SpaceService.update(updatedSpace);
        ResponseUtil.ok(res);
    }

    public static async updateStatus(req: Request, res: Response): Promise<void> {
        const spaceId = req.params['space_id'] as unknown as number;
        const status = req.body['status'] as unknown as string;

        if(!spaceId || !status) {
            return ResponseUtil.missingAttribute(res);
        }

        if(![SpaceStatus.OPEN, SpaceStatus.CLOSED].some(s => s === status)) {
            return ResponseUtil.invalidAttributes(res);
        }

        const space = await SpaceService.fetchById(spaceId);
        if(!space) {
            return ResponseUtil.notFound(res);
        }

        if(space.status === SpaceStatus.UNDER_MAINTENANCE) {
            return ResponseUtil.badRequest(res, 'Space under maintenance');
        }

        space.status = status as SpaceStatus;
        try {
            await SpaceService.update(space);
            ResponseUtil.ok(res);
        } catch (e) {
            console.error(e);
            ResponseUtil.serverError(res);
        }
    }

    public static async deleteSpace(req: Request, res: Response):Promise<void> {
        const spaceId = req.params['space_id'] as unknown as number;
        if (!spaceId){
            return ResponseUtil.missingAttribute(res);
        }

        const space = await SpaceService.fetchById(spaceId);
        if(!space){
            return ResponseUtil.notFound(res);
        }
        //TODO : delete if not animals in space
        await MaintenanceService.deleteBySpace(space);
        await SpaceService.delete(space);
        ResponseUtil.ok(res);
    }

    public static async underMaintenanceSpace(req: Request, res: Response):Promise<void> {
        const spaceId = req.params['space_id'] as unknown as number;
        if (!spaceId){
            return ResponseUtil.missingAttribute(res);
        }

        const space = await SpaceService.fetchById(spaceId);
        if(!space) return ResponseUtil.notFound(res);

        space.status = SpaceStatus.UNDER_MAINTENANCE;
        await SpaceService.update(space);
        ResponseUtil.ok(res);
    }

    private static createModelSpace(req: Request) {
        const name: string = req.body['name'];
        const description: string = req.body['description'];
        const image: string = req.body['image'];
        const capacity: number = req.body['capacity'];
        const type: string = req.body['type'];
        const openingTime: string= req.body['openingTime'];
        const closureHour: string = req.body['closureHour'];
        const accessHandicap: boolean = req.body['accessHandicap'];
        const status: string = req.body['status'];

        const newSpace = new Space();
        newSpace.name = name;
        newSpace.description = description;
        newSpace.image = image;
        newSpace.capacity = capacity;
        newSpace.type = type;
        newSpace.openingTime = dayjs(openingTime, 'HH:mm').format('HH:mm');
        newSpace.closureHour = dayjs(closureHour, 'HH:mm').format('HH:mm');
        newSpace.accessHandicap = accessHandicap;
        newSpace.status = status;

        return newSpace;
    }
}