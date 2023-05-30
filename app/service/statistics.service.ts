import {db} from "../config/typeorm.config";
import {Statistics} from "../entity";
import {SpaceHistoryService} from "./spaceHistory.service";
import {SpaceService} from "./space.service";

export class StatisticsService {
    public static async fetchAll(): Promise<Statistics[]> {
        return db.getRepository(Statistics).find({
            relations: {
                space: true
            }
        });
    }

    public static async fetchBySpace(spaceId: number): Promise<Statistics[]> {
        return db.getRepository(Statistics).find({
            relations: {
                space: true
            },
            where: {
                space: {
                    id: spaceId
                }
            }
        });
    }

    public static async fetchByTypeAndSpace(type: string, spaceId: number): Promise<Statistics[]> {
        return db.getRepository(Statistics).find({
            relations: {
                space: true
            },
            where: {
                type: type,
                space: {
                    id: spaceId
                }
            }
        });
    }

    public static async fetchAllByASCVisitorsNumber(type: string, spaceId: number): Promise<Statistics[]> {
        return db.getRepository(Statistics).find({
            relations: {
                space: true
            },
            where: {
                type: type,
                space: {
                    id: spaceId
                }
            },
            order: {
                visitorsNumber: "ASC"
            }
        });
    }

    public static async saveStatistics(from:Date, to:Date, type: string): Promise<void> {
        const spaces = await SpaceService.fetchAll();

        if(spaces.length === 0) return ;

        for(const space of spaces) {
            const number =  await SpaceHistoryService.getVisitorsNumberBetweenDate(space.id, from, to);
            if(number === 0 ) return;

            const statistics = new Statistics();
            statistics.space = space;
            statistics.visitorsNumber = number;
            statistics.type = type;
            statistics.from = from;
            statistics.to = to;
            await StatisticsService.create(statistics);
        }
    }

    public static async create(statistics: Statistics): Promise<Statistics> {
        return db.getRepository(Statistics).save(statistics);
    }
}