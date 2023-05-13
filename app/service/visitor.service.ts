import {db} from "../config/typeorm.config";
import {Visitor} from "../entity";
import {UpdateResult} from "typeorm";

export class VisitorService {
    public static async fetchAll(): Promise<Visitor[]> {
        return db.getRepository(Visitor).find({
            relations: {tickets: true}
        });
    }

    public static async fetchById(visitor_id: number): Promise<Visitor|null> {
        return db.getRepository(Visitor).findOne({
            where: {id: visitor_id},
            relations: {tickets: true}
        });
    }

    public static async fetchByEmail(email: string): Promise<Visitor|null> {
        return db.getRepository(Visitor).findOne({
            where: {email: email},
            relations: {tickets: true}
        });
    }

    public static async create(visitor: Visitor): Promise<Visitor> {
        return db.getRepository(Visitor).save(visitor);
    }

    public static async update(visitor: Visitor): Promise<Visitor> {
        return db.getRepository(Visitor).save(visitor);
    }

    public static async delete(visitor: Visitor): Promise<UpdateResult> {
        return db.getRepository(Visitor).softDelete({id: visitor.id});
    }
}