import {DataSource} from "typeorm";
import {config} from 'dotenv';
import {Employee, EmployeeStatus, Role, RoleEnum} from "../entity";
import {EmployeeService, RoleService} from "../service";
import dayjs from './dayjs.config';
import PwdUtil from "../util/pwd.util";

config();

const dbConfig = require('./db.config');


export const db = new DataSource({
    type: dbConfig.type,
    host: dbConfig.HOST,
    port: process.env.MYSQL_PORT as unknown as number || 3306,
    username: dbConfig.USER,
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

async function createAdmin() {
    if(await EmployeeService.fetchByIdentifier('admin', 'admin')) {
        return;
    }

    // fetch role
    const defaultRole = await RoleService.fetchByName(RoleEnum.ADMIN);
    if(!defaultRole) {
        console.error("cannot get admin");
        process.exit();
        return;
    }

    const employee = new Employee();
    employee.firstname = 'admin';
    employee.lastname = 'dmin';
    employee.password = await PwdUtil.hash('admin');
    employee.roles = [defaultRole];
    employee.status = EmployeeStatus.UNKNOWN;
    const resEmployee = await EmployeeService.create(employee);
    if(!resEmployee) {
        console.error("cannot create admin");
        process.exit();
    }
}

export async function initialize_typeorm(db: DataSource) {
    await db.initialize();
    await upsertRoles();
    await createAdmin();
}






