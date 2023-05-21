import { db } from "../config/typeorm.config";
import {Ticket, TicketHistory} from "../entity";
import {Like, UpdateResult} from "typeorm";

export class TicketHistoryService {
    public static async fetchAll(): Promise<TicketHistory[]> {
        return db.getRepository(TicketHistory).find({});
    }

    public static async fetchById(ticketHistoryId: number): Promise<TicketHistory | null> {
        return db.getRepository(TicketHistory).findOne({
            where: { id: ticketHistoryId },
        });
    }

    public static async fetchByTicket(ticket_id: number): Promise<TicketHistory | null> {
        return db.getRepository(TicketHistory).findOne({
            relations: {ticket: true},
            where: {
                ticket: {
                    id: ticket_id
                }
            }
        });
    }

    public static async attachToTicket(ticket: Ticket): Promise<TicketHistory> {
        const ticketHistory = new TicketHistory();
        ticketHistory.entryAt = new Date();
        ticketHistory.ticket = ticket;
        return this.create(ticketHistory);
    }

    public static async create(ticketHistory: TicketHistory): Promise<TicketHistory> {
        return db.getRepository(TicketHistory).save(ticketHistory);
    }

    public static async update(ticketHistory: TicketHistory): Promise<TicketHistory> {
        return db.getRepository(TicketHistory).save(ticketHistory);
    }

    public static async delete(ticketHistory: TicketHistory): Promise<UpdateResult> {
        return db.getRepository(TicketHistory).softDelete({ id: ticketHistory.id });
    }
}
