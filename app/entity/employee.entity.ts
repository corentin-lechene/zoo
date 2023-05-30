import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
    DeleteDateColumn
} from 'typeorm';
import {Length} from 'class-validator';
import {Role} from "./role.entity";
import {TokenData} from "../util";


export enum EmployeeStatus {
    PRESENT = 'PRESENT',
    ABSENT = 'ABSENT',
    UNKNOWN = 'UNKNOWN'
}

@Entity({ name: 'employee' })
export class Employee {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'firstname', length: 48 })
    @Length(1, 48)
    firstname: string;

    @Column({ name: 'lastname', length: 48 })
    @Length(1, 48)
    lastname: string;

    @Column({name: 'password'})
    password: string;

    @Column({ name: 'token', length: 256, nullable: true })
    token: string;

    @ManyToMany(() => Role)
    @JoinTable()
    roles: Role[];

    @Column({ name: 'status', type: 'varchar', default: EmployeeStatus.UNKNOWN })
    status: EmployeeStatus;

    @DeleteDateColumn()
    deletedAt: Date;

    toTokenData(): TokenData {
        return {
            id: this.id,
        }
    }
}