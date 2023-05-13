import {Request, Response} from "express";
import {CourseService, PassService} from "../service";
import {ResponseUtil} from "../util";
import {Pass} from "../entity";

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
        const courseId = req.body['course_id'] as unknown as number;

        if(!name || !price) {
            return ResponseUtil.missingAttribute(res);
        }

        const course = await CourseService.fetchById(courseId);
        if(courseId && !course) {
            return ResponseUtil.notFound(res);
        }

        const newPass = new Pass();
        newPass.name = name;
        newPass.price = price;
        newPass.course = course;
        await PassService.create(newPass);
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