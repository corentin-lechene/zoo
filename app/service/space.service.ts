import {db} from "../config/typeorm.config";
import {Space} from "../entity";
import {FindOptionsWhere, UpdateResult} from "typeorm";

export class SpaceService {
    public static async fetchAll(): Promise<Space[]> {
        return db.getRepository(Space).find({
            relations: {
                maintenances: true
            }
        });
    }

    public static async fetchById(space_id: number): Promise<Space|null> {
        return db.getRepository(Space).findOne({
            where: {id: space_id},
        });
    }

    public static async fetchByName(space_name: string): Promise<Space|null> {
        return db.getRepository(Space).findOne({
            where: {name: space_name},
        });
    }

    public static async fetchByIds(spaceIds: number[]): Promise<Space[]> {
        const buildWhere: FindOptionsWhere<Space>[] = spaceIds.map((id) => ({id: id}));
        return db.getRepository(Space).find({
            where: buildWhere,
        });
    }

    public static async create(space: Space): Promise<Space> {
        return db.getRepository(Space).save(space);
    }

    public static async update(space: Space): Promise<Space> {
        return db.getRepository(Space).save(space);
    }

    public static async delete(space: Space): Promise<UpdateResult>{
        return db.getRepository(Space).softDelete({id: space.id});
    }
}