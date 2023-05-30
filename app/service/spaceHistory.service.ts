import { db } from "../config/typeorm.config";
import {Between, UpdateResult} from "typeorm";
import {SpaceHistory} from "../entity/spaceHistory.entity";
import {Space, Ticket} from "../entity";

export class SpaceHistoryService {
    public static async fetchAll(): Promise<SpaceHistory[]> {
        return db.getRepository(SpaceHistory).find({});
    }

    public static async attachToSpaceHistory(ticket: Ticket, space:Space): Promise<SpaceHistory> {
        const spaceHistory = new SpaceHistory();
        spaceHistory.space = space;
        spaceHistory.ticket = ticket;
        spaceHistory.entryAt = new Date();
        return this.create(spaceHistory);
    }

    public static async fetchByTicket(ticketId: number): Promise<SpaceHistory | null> {
        return db.getRepository(SpaceHistory).findOne({
            where: {
               ticket: {
                   id: ticketId
               }
            }
        });
    }

    public static async fetchByTicketAndSpace(ticketId: number, spaceId: number): Promise<SpaceHistory | null> {
        return db.getRepository(SpaceHistory).findOne({
            where: {
                ticket: {
                    id: ticketId
                },
                space: {
                    id: spaceId
                }
            }
        });
    }

    public static async getRealVisitorsNumberBySpace(spaceId: number): Promise<number> {
        return db.getRepository(SpaceHistory).count({
            where: {
                space: {
                    id: spaceId
                }
            }
        });
    }

    public static async getVisitorsNumberBetweenDate(spaceId: number, from: Date, to: Date): Promise<number> {
        return db.getRepository(SpaceHistory).count({
            where: {
                space: {
                    id: spaceId
                },
                entryAt: Between(from, to)
            },
            withDeleted: true
        });
    }

    public static async create(spaceHistory: SpaceHistory): Promise<SpaceHistory> {
        return db.getRepository(SpaceHistory).save(spaceHistory);
    }

    public static async update(spaceHistory: SpaceHistory): Promise<SpaceHistory> {
        return db.getRepository(SpaceHistory).save(spaceHistory);
    }

    public static async delete(spaceHistory: SpaceHistory): Promise<UpdateResult> {
        return db.getRepository(SpaceHistory).softDelete({ id: spaceHistory.id });
    }
}