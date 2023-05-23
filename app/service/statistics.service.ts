import {db} from "../config/typeorm.config";
import {Space, Statistics} from "../entity";
import {SpaceHistoryService} from "./spaceHistory.service";
import {SpaceService} from "./space.service";

export class StatisticsService {
    public static async fetchAll(): Promise<Statistics[]> {
        return db.getRepository(Statistics).find({});
    }

    public static async create(statistics: Statistics): Promise<Statistics> {
        return db.getRepository(Statistics).save(statistics);
    }

    public static async saveStatistics(from: string, to:string): Promise<void> {

        //TODO : fetch all spaces
        const number = await SpaceHistoryService.getVisitorsNumberBetweenDate(1, from, to);
        if(number === 0 ) return;

        //create Statistics
        const statistics = new Statistics();
        const space = await SpaceService.fetchById(1);

        if(!space) {
            console.log("PROBLEM !!");
            return;
        }
        statistics.space = space;
        statistics.visitorsNumber = number;
        await StatisticsService.create(statistics);
    }
}