import {db} from "../config/typeorm.config";
import {Pass} from "../entity";
import {UpdateResult} from "typeorm";
import dayjs from "../config/dayjs.config";
import {Dayjs} from "dayjs";

export class PassService {
    public static async fetchAll(): Promise<Pass[]> {
        return db.getRepository(Pass).find({
            relations: {access: true}
        });
    }

    public static async fetchById(pass_id: number): Promise<Pass|null> {
        return db.getRepository(Pass).findOne({
            where: {id: pass_id},
            relations: {access: true}
        });
    }

    public static async fetchByName(name: string): Promise<Pass|null> {
        return db.getRepository(Pass).findOne({
            where: {name: name},
            relations: {access: true}
        });
    }

    public static async create(pass: Pass): Promise<Pass> {
        return db.getRepository(Pass).save(pass);
    }

    public static async update(pass: Pass): Promise<Pass> {
        return db.getRepository(Pass).save(pass);
    }

    public static async delete(pass: Pass): Promise<UpdateResult> {
        return db.getRepository(Pass).softDelete({id: pass.id});
    }

    static getSchedule(pass: Pass): {entryHour: Dayjs, endHour: Dayjs} {
        const entryHour = dayjs(pass.entryHour, 'HH:mm');
        let endHour = dayjs(pass.endHour, 'HH:mm');
        if(entryHour.isAfter(endHour, 'hour')) {
            endHour = endHour.add(1, 'day');
        }
        return { entryHour, endHour };
    }
}