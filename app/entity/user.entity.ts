import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
    CreateDateColumn,
    UpdateDateColumn, DeleteDateColumn
} from 'typeorm';

import {
    Length,
} from 'class-validator';

import {Role} from "./role.entity";
//todo changer le nom de cette class en employee
@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'firstname', length: 48 })
    @Length(1, 48)
    firstname: string;

    @Column({ name: 'lastname', length: 48 })
    @Length(1, 48)
    lastname: string;


    @ManyToMany(() => Role)
    @JoinTable()
    roles: Role[];

    @Column({ name: 'status', length: 24 })
    @Length(1,24)
    status: string;

    @UpdateDateColumn()
    updatedAt: Date;

    @CreateDateColumn()
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}