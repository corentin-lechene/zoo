import { db } from "../config/typeorm.config";
import { UpdateResult } from "typeorm";
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

    public static async fetchBySpaceAndTicket(ticketId: number, spaceId: number): Promise<SpaceHistory | null> {
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

    public static async getRealVisitorsNumber(spaceId: number): Promise<number> {
        return db.getRepository(SpaceHistory).count({
            where: {
                space: {
                    id: spaceId
                }
            }
        });
    }

    public static async getVisitorsNumber(spaceId: number): Promise<number> {
        return db.getRepository(SpaceHistory).count({
            where: {
                space: {
                    id: spaceId
                }
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