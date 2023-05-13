import {Request, Response} from "express";
import {VisitorService} from "../service";
import {ResponseUtil} from "../util";
import {Visitor} from "../entity";

export class VisitorController {
    public static async fetchAllVisitors(req: Request, res: Response): Promise<void> {
        res.json(await VisitorService.fetchAll());
    }

    public static async fetchVisitor(req: Request, res: Response): Promise<void> {
        const visitorId = req.params['visitor_id'] as unknown as number;
        if(!visitorId) {
            return ResponseUtil.missingAttribute(res);
        }

        const visitor = await VisitorService.fetchById(visitorId);
        if(!visitor) {
            return ResponseUtil.notFound(res);
        }

        res.status(200).json(visitor);
    }

    public static async createVisitor(req: Request, res: Response): Promise<void> {
        const firstname = req.body['firstname'] as unknown as string;
        const lastname = req.body['lastname'] as unknown as string;
        const email = req.body['email'] as unknown as string;
        const handicapAccess = req.body['handicap_access'] as unknown as boolean;

        if(!firstname || !lastname || !email) {
            return ResponseUtil.missingAttribute(res);
        }

        if(await VisitorService.fetchByEmail(email)) {
            return ResponseUtil.alreadyExist(res);
        }

        const newVisitor = new Visitor();
        newVisitor.firstname = firstname;
        newVisitor.lastname = lastname;
        newVisitor.email = email;
        newVisitor.handicapAccess = handicapAccess || false;
        await VisitorService.create(newVisitor);
        ResponseUtil.created(res);
    }

    public static async deleteVisitor(req: Request, res: Response): Promise<void> {
        const visitorId = req.params['visitor_id'] as unknown as number;
        if(!visitorId) {
            return ResponseUtil.missingAttribute(res);
        }

        const visitor = await VisitorService.fetchById(visitorId);
        if(!visitor) {
            return ResponseUtil.notFound(res);
        }

        await VisitorService.delete(visitor);
        ResponseUtil.ok(res);
    }
}