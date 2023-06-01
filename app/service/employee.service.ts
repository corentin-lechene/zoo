import {db} from "../config/typeorm.config";
import {Employee, EmployeeStatus} from "../entity";
import {Like, UpdateResult} from "typeorm";

export class EmployeeService {
    public static async fetchEmployeeWhoWorks(): Promise<Employee[]> {
        return db.getRepository(Employee).find({
            where: {
                status: EmployeeStatus.PRESENT,
            },
            relations: {roles: true},
        });
    }
    public static async fetchAll(): Promise<Employee[]> {
        return db.getRepository(Employee).find({
            relations: {roles: true}
        });
    }

    public static async fetchById(user_id: number): Promise<Employee|null> {
        return db.getRepository(Employee).findOne({
            where: {id: user_id},
            relations: {roles: true}
        });
    }

    static async fetchByIdentifier(identifier: string, password: string): Promise<Employee|null> {
        if(identifier.length < 2 || !password) {
            return null;
        }
        return db.getRepository(Employee).findOne({
            where: {
                firstname: Like(`${identifier[0].toLowerCase()}%`),
                lastname: identifier.slice(1).toLowerCase(),
            },
            relations: {roles: true}
        })
    }

    public static fetchByToken(token: string) {
        return db.getRepository(Employee).findOne({
            where: {token: token},
            relations: {roles: true}
        })
    }

    public static async create(user: Employee): Promise<Employee|null> {
        return db.getRepository(Employee).save(user);
    }

    static async update(user: Employee) {
        return db.getRepository(Employee).save(user);
    }

    public static async delete(employee: Employee): Promise<UpdateResult> {
        return db.getRepository(Employee).softDelete({
            id: employee.id
        })
    }
}