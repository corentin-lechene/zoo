import {db} from "../config/typeorm.config";
import {Ticket} from "../entity";
import {UpdateResult} from "typeorm";

import dayjs from '../config/dayjs.config';
import {PassService} from "./pass.service";

export class TicketService {

    public static isValidToEnter(ticket: Ticket): boolean {
        const pass = ticket.pass;

        if (ticket.deletedAt) {
            console.log("[TEST] ");
            return false;
        }

        // Vérifier si le ticket est expiré
        /*if (ticket.expireAt && dayjs().isAfter(ticket.expireAt)) {
            console.log("[TEST] Le ticket est expiré");
            return false;
        }*/

        // Vérifier si le pass est restreint à certains jours
        if (pass.days && pass.days.length > 0) {
            const currDay = dayjs().day();
            if (!pass.days.find((day) => day === currDay)) {
                console.log(`[TEST] Ticket ne peut pas être utilisé ce jour ${currDay}`);
                return false;
            }
        }

        // Vérifier que le ticket peut être utilisé dans les horaires du pass
        const {entryHour, endHour} = PassService.getSchedule(pass);
        if (!dayjs().isBetween(entryHour, endHour, null, '[]')) {
            console.log("[TEST] Ne peut pas y accéder à cause de l'heure");
            return false;
        }

        // Vérifier que le ticket peut être utilisé dans la durée du pass
        if (ticket.ticketHistory.length > 0) {
            const entryAt = ticket.ticketHistory[0].entryAt;
            // Vérifier qu'il a pas déjà utilisé aujourd'hui
            if (dayjs(ticket.ticketHistory[ticket.ticketHistory.length - 1].entryAt).isSame(dayjs(), 'day')) {
                console.log("[TEST] Utilisé aujourd'hui");
                return false;
            }

            // Vérifier qu'il est toujours valide dans la période
            if (dayjs().isAfter(dayjs(entryAt).add(pass.duration, pass.period), 'day')) {
                console.log(`[TEST] Ne peut pas y accéder car ${pass.period} x${pass.duration} est passé`);
                return false;
            }

            // Vérifier la fréquence d'utilisation
            if (pass.frequency && pass.limit) {
                const tickets = ticket.ticketHistory.filter((th) => dayjs(th.entryAt).isSameOrAfter(dayjs(), pass.frequency));
                if (tickets.length === pass.limit) {
                    console.log(`[TEST] Ne peut pas y accéder car déjà allé ${tickets.length} ce ${pass.frequency}`);
                    return false;
                }
            }
        }

        console.log("[TEST] Tout est OK");
        return true;
    }

    public static async fetchAll(): Promise<Ticket[]> {
        return db.getRepository(Ticket).find({
            relations: {visitor: true, pass: true, ticketHistory: true}
        });
    }

    public static async fetchById(ticket_id: number): Promise<Ticket | null> {
        return db.getRepository(Ticket).findOne({
            where: {id: ticket_id},
            relations: {visitor: true, pass: true, ticketHistory: true}
        });
    }

    public static async create(ticket: Ticket): Promise<Ticket> {
        return db.getRepository(Ticket).save(ticket);
    }

    public static async update(ticket: Ticket): Promise<Ticket> {
        return db.getRepository(Ticket).save(ticket);
    }

    public static async delete(ticket: Ticket): Promise<UpdateResult> {
        return db.getRepository(Ticket).softDelete({id: ticket.id});
    }
}