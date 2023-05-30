import {db} from "../config/typeorm.config";
import {UpdateResult} from "typeorm";
import {Maintenance} from "../entity";
import {Space} from "../entity";

export class MaintenanceService {
    public static async fetchAll(): Promise<Maintenance[]> {
        return db.getRepository(Maintenance).find({});
    }

    public static async fetchById(maintenance_id: number): Promise<Maintenance|null> {
        return db.getRepository(Maintenance).findOne({
            where: {id: maintenance_id},
        });
    }

    public static async create(maintenance: Maintenance): Promise<Maintenance> {
        return db.getRepository(Maintenance).save(maintenance);
    }

    public static async update(maintenance: Maintenance): Promise<Maintenance> {
        return db.getRepository(Maintenance).save(maintenance);
    }

    public static async delete(maintenance: Maintenance): Promise<UpdateResult>{
        return db.getRepository(Maintenance).softDelete({id: maintenance.id});
    }

    public static async deleteBySpace(space: Space): Promise<UpdateResult>{
        return db.getRepository(Maintenance).softDelete({space: {id: space.id}});
    }
}