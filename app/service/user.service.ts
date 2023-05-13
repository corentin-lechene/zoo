import {db} from "../config/typeorm.config";
import {User} from "../entity";

export class UserService {
    public static async fetchAll(): Promise<User[]> {
        return db.getRepository(User).find({
            relations: {roles: true}
        });
    }

    public static async fetchById(user_id: number): Promise<User|null> {
        return db.getRepository(User).findOne({
            where: {id: user_id},
            relations: {roles: true}
        });
    }

    // public static async fetchByEmail(email: string): Promise<User|null> {
    //     return db.getRepository(User).findOne({
    //         where: {},
    //         relations: {roles: true}
    //     });
    // }

    public static async create(user: User): Promise<User|null> {
        return db.getRepository(User).save(user);
    }

    static async update(user: User) {
        return db.getRepository(User).save(user);
    }
}