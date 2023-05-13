import {db} from "../config/typeorm.config";
import {Ticket} from "../entity";

export class TicketService {
    public static async fetchAll(): Promise<Ticket[]> {
        return db.getRepository(Ticket).find({
            relations: {visitor: true, pass: true}
        });
    }

    public static async fetchById(ticket_id: number): Promise<Ticket|null> {
        return db.getRepository(Ticket).findOne({
            where: {id: ticket_id},
            relations: {visitor: true, pass: true}
        });
    }

    public static async create(ticket: Ticket): Promise<Ticket> {
        return db.getRepository(Ticket).save(ticket);
    }

    public static async update(ticket: Ticket): Promise<Ticket> {
        return db.getRepository(Ticket).save(ticket);
    }
}