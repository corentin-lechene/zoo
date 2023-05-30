import {Request, Response} from "express";
import {PassService} from "../service";
import {ResponseUtil} from "../util";
import {Pass} from "../entity";
import {SpaceService} from "../service";
import {validate} from "class-validator";
import dayjs = require("dayjs");
import {ManipulateType} from "dayjs";

export class PassController {
    public static async fetchAllPasses(req: Request, res: Response): Promise<void> {
        res.json(await PassService.fetchAll());
    }

    public static async fetchPass(req: Request, res: Response): Promise<void> {
        const passId = req.params['pass_id'] as unknown as number;
        if(!passId) {
            return ResponseUtil.missingAttribute(res);
        }

        const pass = await PassService.fetchById(passId);
        if(!pass) {
            return ResponseUtil.notFound(res);
        }

        res.status(200).json(pass);
    }

    public static async createPass(req: Request, res: Response): Promise<void> {
        const name = req.body['name'] as unknown as string;
        const price = req.body['price'] as unknown as number;
        const spaceIds = req.body['space_ids'] as unknown as number[];
        const course = req.body['course'] as unknown as boolean;
        const limit = req.body['limit'] as unknown as number;
        const frequency = req.body['frequency'] as unknown as string;
        const duration = req.body['duration'] as unknown as number;
        const period = req.body['period'] as unknown as string;
        const days = req.body['days'] as unknown as  number[];
        const entryHour = req.body['entry_hour'] as unknown as string;
        const endHour = req.body['end_hour'] as unknown as string;

        //
        if(!name || !price || !spaceIds || !course || !duration || !period || !entryHour || !endHour) {
            return ResponseUtil.missingAttribute(res);
        }
        //
        if(!dayjs(entryHour, 'HH:mm').isValid() || !dayjs(endHour, 'HH:mm').isValid()) {
            return ResponseUtil.badRequest(res, 'Hours');
        }


        const spaces = await SpaceService.fetchByIds(spaceIds);

        const newPass = new Pass();
        newPass.name = name;
        newPass.price = price;
        newPass.access = spaces;
        newPass.course = course;
        newPass.limit = limit;
        newPass.frequency = frequency as ManipulateType;
        newPass.duration = duration;
        newPass.period = period as ManipulateType;
        newPass.days = days;
        newPass.entryHour = entryHour;
        newPass.endHour = endHour;

        const errors = await validate(newPass);
        if(errors.length > 0) {
            return ResponseUtil.badRequest(res, 'Invalid Form');
        }

        const requestNewPass = await PassService.create(newPass);
        if (!requestNewPass) {
            return ResponseUtil.serverError(res);
        }
        ResponseUtil.created(res);
    }

    public static async deletePass(req: Request, res: Response): Promise<void> {
        const passId = req.params['pass_id'] as unknown as number;
        if(!passId) {
            return ResponseUtil.missingAttribute(res);
        }

        const pass = await PassService.fetchById(passId);
        if(!pass) {
            return ResponseUtil.notFound(res);
        }

        await PassService.delete(pass);
        ResponseUtil.ok(res);
    }
}