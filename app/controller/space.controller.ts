import {Request, Response} from "express";
import {SpaceService, StatisticsService} from "../service";
import {ResponseUtil} from "../util";
import {Space, StatusEnum, typeStatsEnum} from "../entity";
import dayjs from "../config/dayjs.config";
import {MaintenanceService} from "../service/maintenance.service";
import {SpaceHistoryService} from "../service/spaceHistory.service";
import {TicketHistoryService} from "../service/ticketHistoty.service";
import e = require("express");

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

    public static async deleteSpace(req: Request, res: Response):Promise<void> {
        const spaceId = req.params['space_id'] as unknown as number;
        if (!spaceId){
            return ResponseUtil.missingAttribute(res);
        }

        const space = await SpaceService.fetchById(spaceId);
        if(!space){
            return ResponseUtil.notFound(res);
        }

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

        space.status = StatusEnum.UNDER_MAINTENANCE;
        await SpaceService.update(space);
        ResponseUtil.ok(res);
    }

    public static async fetchBestMonthToMaintain(req: Request, res: Response):Promise<Promise<e.Response> | Promise<void>> {
        const spaceId = req.params['space_id'] as unknown as number;
        if (!spaceId){
            return ResponseUtil.missingAttribute(res);
        }

        const space = await SpaceService.fetchById(spaceId);
        if(!space) return ResponseUtil.notFound(res);

        const statistics = await StatisticsService.fetchAllByASCVisitorsNumber(typeStatsEnum.MONTHLY_STATS, spaceId);
        if (statistics.length === 0) return ResponseUtil.noContent(res);
        const bestMonth = dayjs(statistics[0].from).add(1, 'day').format("MM");
        return res.status(200).json({Month : bestMonth});
    }

    public static async enterSpace(req: Request, res: Response): Promise<void> {
        const spaceId = req.params['space_id'] as unknown as number;
        const ticketId = req.body['ticket_id'] as unknown as number;

        const space = await SpaceService.fetchById(spaceId);
        const ticketHistory = await TicketHistoryService.fetchByTicket(ticketId);

        if(!space || !ticketHistory) return ResponseUtil.notFound(res);
        const spaceHistory = await SpaceHistoryService.fetchByTicket(ticketId);
        if(spaceHistory) return ResponseUtil.alreadyExist(res);

        await SpaceHistoryService.attachToSpaceHistory(ticketHistory.ticket, space);
        ResponseUtil.ok(res);
    }

    public static async exitSpace(req: Request, res: Response): Promise<void> {
        const spaceId = req.params['space_id'] as unknown as number;
        const ticketId = req.body['ticket_id'] as unknown as number;

        const space = await SpaceService.fetchById(spaceId);
        const spaceHistory = await SpaceHistoryService.fetchByTicketAndSpace(ticketId, spaceId);

        if(!space || !spaceHistory) return ResponseUtil.notFound(res);

        await SpaceHistoryService.delete(spaceHistory);
        ResponseUtil.ok(res);
    }

    public static async fetchVisitorsNumber(req: Request, res: Response): Promise<Promise<e.Response> | Promise<void>>{
        const spaceId = req.params['space_id'] as unknown as number;
        if(!spaceId) return ResponseUtil.missingAttribute(res);

        const realNumberVisitor: number = await SpaceHistoryService.getRealVisitorsNumberBySpace(spaceId)
        return res.status(200).json({visitorsNumber : realNumberVisitor})
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