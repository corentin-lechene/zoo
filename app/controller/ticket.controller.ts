import {Request, Response} from "express";
import {PassService, TicketService, VisitorService} from "../service";
import {ResponseUtil} from "../util";
import {Ticket, TicketStatus} from "../entity";
import {TicketHistoryService} from "../service/ticketHistoty.service";

export class TicketController {

    public static async activeTicket(req: Request, res: Response): Promise<void> {
        const ticketId = req.params['ticket_id'] as unknown as number;
        if(!ticketId) {
            return ResponseUtil.missingAttribute(res);
        }

        const ticket = await TicketService.fetchById(ticketId);
        if(!ticket) {
            return ResponseUtil.notFound(res);
        }

        // Vérification du ticket
        if(!TicketService.isValidToEnter(ticket)) {
            return ResponseUtil.badRequest(res, "Ticket Invalid");
        }

        // if(!ticket.expireAt) {
        //     const pass = ticket.pass;
        //     console.log(dayjs().startOf('day').add(pass.duration - 1, pass.unit).format('llll'))
        //     ticket.expireAt = dayjs().startOf('day').add(pass.duration - 1, pass.unit).toDate();
        // }

        await TicketService.update(ticket);
        await TicketHistoryService.attachToTicket(ticket)
        ResponseUtil.ok(res);
    }

    public static async fetchAllTickets(req: Request, res: Response): Promise<void> {
        res.json(await TicketService.fetchAll());
    }

    public static async fetchTicket(req: Request, res: Response): Promise<void> {
        const ticketId = req.params['ticket_id'] as unknown as number;
        if(!ticketId) {
            return ResponseUtil.missingAttribute(res);
        }

        const ticket = await TicketService.fetchById(ticketId);
        if(!ticket) {
            return ResponseUtil.notFound(res);
        }

        TicketService.isValidToEnter(ticket);

        res.status(200).json(ticket);
    }

    public static async createTicket(req: Request, res: Response): Promise<void> {
        const passId = req.body['pass_id'] as unknown as number;
        const email = req.body['email'] as unknown as string;

        if(!passId || !email) {
            return ResponseUtil.missingAttribute(res);
        }

        const pass = await PassService.fetchById(passId);
        const visitor = await VisitorService.fetchByEmail(email);
        if(!pass || !visitor) {
            return ResponseUtil.notFound(res);
        }

        const newTicket = new Ticket();
        newTicket.pass = pass;
        newTicket.visitor = visitor;
        newTicket.purchaseAt = new Date();
        newTicket.status = TicketStatus.VALID;
        await TicketService.create(newTicket);
        ResponseUtil.created(res);
    }

    public static async deleteTicket(req: Request, res: Response): Promise<void> {
        const ticketId = req.params['ticket_id'] as unknown as number;
        if(!ticketId) {
            return ResponseUtil.missingAttribute(res);
        }

        const ticket = await TicketService.fetchById(ticketId);
        if(!ticket) {
            return ResponseUtil.notFound(res);
        }

        await TicketService.delete(ticket);
        ResponseUtil.ok(res);
    }
}