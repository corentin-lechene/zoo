import {db} from "../config/typeorm.config";
import {Pass} from "../entity";
import {UpdateResult} from "typeorm";

export class PassService {
    public static async fetchAll(): Promise<Pass[]> {
        return db.getRepository(Pass).find({
            relations: {course: true}
        });
    }

    public static async fetchById(pass_id: number): Promise<Pass|null> {
        return db.getRepository(Pass).findOne({
            where: {id: pass_id},
            relations: {course: true}
        });
    }

    public static async fetchByName(name: string): Promise<Pass|null> {
        return db.getRepository(Pass).findOne({
            where: {name: name},
            relations: {course: true}
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
}