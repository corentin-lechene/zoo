import {DataSource} from "typeorm";
import {config} from 'dotenv';
import {Role, RoleEnum} from "../entity";
import {RoleService} from "../service";
import dayjs from './dayjs.config';

config();

const dbConfig = require('./db.config');


export const db = new DataSource({
    type: dbConfig.type,
    host: dbConfig.HOST,
    port: process.env.MYSQL_PORT as unknown as number || 3306,
    username: dbConfig.USERNAME,
    password: dbConfig.PASSWORD,
    database: dbConfig.DATABASE,
    timezone: dayjs().tz().format('Z'),
    synchronize: true,
    logging: false,
    entities: ["dist/**/*.entity.js"],
    subscribers: [],
    migrations: [],
});


async function upsertRoles() {
    const currentRoles = await RoleService.fetchAll();
    const rolesName = Object.keys(RoleEnum).filter((v) => isNaN(Number(v)));

    if(currentRoles.length === rolesName.length) {
        return;
    }

    const rolesToAdd = rolesName.map((name, roleId) => {
        const role = new Role();
        role.id = roleId + 1;
        role.name = name;
        return RoleService.create(role);
    })
    await Promise.all(rolesToAdd);
}

export async function initialize_typeorm(db: DataSource) {
    await db.initialize();
    await upsertRoles();
}






