import {Request, Response} from "express";
import {SpaceService, StatisticsService} from "../service";
import {ResponseUtil} from "../util";

export class StatisticsController {
    public static async fetchAll(req: Request, res: Response): Promise<void> {
        res.json(await StatisticsService.fetchAll());
    }

    public static async fetchBySpace(req: Request, res: Response): Promise<void> {
        const spaceId = req.params['space_id'] as unknown as number;

        const space = await SpaceService.fetchById(spaceId);
        if(!space) return ResponseUtil.notFound(res);

        res.json(await StatisticsService.fetchBySpace(spaceId));
    }

    public static async fetchByTypeAndSpace(req: Request, res: Response): Promise<void> {
        const type = req.params['type'] as unknown as string;
        const spaceId = req.params['space_id'] as unknown as number;

        const space = await SpaceService.fetchById(spaceId);
        if(!space) return ResponseUtil.notFound(res);

        res.json(await StatisticsService.fetchByTypeAndSpace(type, spaceId));
    }
}