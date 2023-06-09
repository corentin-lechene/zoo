import {Request, Response} from "express";
import {SpaceService, StatisticsService, TicketService} from "../service";
import {ResponseUtil} from "../util";
import {Space, SpaceStatus, typeStatsEnum} from "../entity";
import dayjs from "../config/dayjs.config";
import {MaintenanceService} from "../service/maintenance.service";
import {SpaceHistoryService} from "../service/spaceHistory.service";

export class SpaceController {
    public static async fetchAllSpaces(req: Request, res: Response): Promise<void> {
        res.json(await SpaceService.fetchAll());
    }

    public static async fetchSpaceById(req: Request, res: Response): Promise<void> {
        res.status(200).json(req.space);
    }

    public static async createSpace(req: Request, res: Response): Promise<void> {
        const space = await SpaceService.fetchByName(req.body['name']);
        if(space) return ResponseUtil.alreadyExist(res);

        const newSpace  = SpaceController.createModelSpace(req);
        await SpaceService.create(newSpace);
        ResponseUtil.created(res);
    }

    public static async updateSpace(req: Request, res: Response): Promise<void> {
        const updatedSpace  = SpaceController.createModelSpace(req);
        if(!req.space) return ResponseUtil.notFound(res);
        updatedSpace.id = req.space.id;
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
        if(!req.space) return ResponseUtil.notFound(res);
        await MaintenanceService.deleteBySpace(req.space);
        await SpaceService.delete(req.space);
        ResponseUtil.ok(res);
    }

    public static async underMaintenanceSpace(req: Request, res: Response):Promise<void> {
        if(!req.space) return ResponseUtil.notFound(res);
        req.space.status = SpaceStatus.UNDER_MAINTENANCE;
        await SpaceService.update(req.space);
        ResponseUtil.ok(res);
    }

    public static async fetchBestMonthToMaintain(req: Request, res: Response): Promise<void> {
        if(!req.space) return ResponseUtil.notFound(res);
        const statistics = await StatisticsService.fetchAllByASCVisitorsNumber(typeStatsEnum.MONTHLY_STATS, req.space.id);
        if (statistics.length === 0) return ResponseUtil.noContent(res);
        const bestMonth = dayjs(statistics[0].from).add(1, 'day').format("MM");
        res.status(200).json({Month : bestMonth});
    }

    public static async exitSpace(req: Request, res: Response): Promise<void> {
        const spaceId = req.params['space_id'] as unknown as number;
        const ticketId = req.body['ticket_id'] as unknown as number;

        const space = await SpaceService.fetchById(spaceId);
        const spaceHistory = await SpaceHistoryService.fetchByTicketAndSpace(ticketId, spaceId);

        if(!space || !spaceHistory) return ResponseUtil.notFound(res);


        await SpaceHistoryService.delete(spaceHistory);
        space.status = SpaceStatus.UNDER_MAINTENANCE;
        await SpaceService.update(space);
        ResponseUtil.ok(res);
    }

    public static async validateUserAccess(req: Request, res: Response): Promise<void> {
        const spaceId = req.params["space_id"] as unknown as number;
        const ticketId = req.body["ticket_id"] as unknown as number;

        if (!spaceId || !ticketId) {
            return ResponseUtil.missingAttribute(res);
        }

        const space = await SpaceService.fetchById(spaceId);
        if (!space) {
            return ResponseUtil.notFound(res);
        }

        const ticket = await TicketService.fetchById(ticketId);
        if (!ticket) {
            return ResponseUtil.notFound(res);
        }

        const pass = ticket.pass;
        if(!pass.access.some(s => s.id === space.id)) {
            return ResponseUtil.badRequest(res, "Access denied");
        }

        if(pass.course) {
            const curr_space = pass.access[ticket.spacesHistories.length];
            if(!curr_space) {
                return ResponseUtil.badRequest(res, "Access denied : course ended");
            }

            if(curr_space.id !== space.id) {
                return ResponseUtil.badRequest(res, "Access denied : space not in pass");
            }
        }

        await SpaceHistoryService.attachToSpaceHistory(ticket, space);
        ResponseUtil.ok(res, "User has access to the space");
    }


    public static async fetchVisitorsNumber(req: Request, res: Response): Promise<void>{
        if(!req.space) return ResponseUtil.notFound(res);
        const realNumberVisitor: number = await SpaceHistoryService.getRealVisitorsNumberBySpace(req.space.id)
        res.status(200).json({visitorsNumber : realNumberVisitor})
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