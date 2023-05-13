import {db} from "../config/typeorm.config";
import {Role} from "../entity";
import {DeleteResult, FindOptionsWhere, UpdateResult} from "typeorm";

export class RoleService {
    public static async fetchAll(): Promise<Role[]> {
        return db.getRepository(Role).find();
    }

    public static async fetchById(roleId: number): Promise<Role | null> {
        return db.getRepository(Role).findOne({
            where: {id: roleId}
        });
    }

    public static async fetchByName(name: string): Promise<Role | null> {
        return db.getRepository(Role).findOne({
            where: {name: name}
        });
    }

    public static async create(role: Role): Promise<Role> {
        return db.getRepository(Role).save(role);
    }

    public static async delete(role: Role): Promise<UpdateResult> {
        return db.getRepository(Role).softDelete({
            id: role.id
        })
    }

    public static async hardDelete(role: Role): Promise<DeleteResult> {
        return db.getRepository(Role).delete({
            id: role.id
        });
    }

    static async fetchByIds(ids: number[]): Promise<Role[]> {
        if(ids.length === 0) {
            return [];
        }

        const buildWhere: FindOptionsWhere<Role>[] = ids.map((id) => {
            return {id: id};
        });
        return db.getRepository(Role).find({
            where: buildWhere
        });
    }
}