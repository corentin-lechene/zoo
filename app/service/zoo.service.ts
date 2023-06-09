import {db} from "../config/typeorm.config";
import {Zoo} from "../entity/zoo.entity";

export class ZooService {
    static async fetchZoo() {
        return db.getRepository(Zoo).findOne({
            where: {
                id: 1
            }
        })
    }

    static async update(zoo: Zoo) {
        return db.getRepository(Zoo).save(zoo);
    }
}