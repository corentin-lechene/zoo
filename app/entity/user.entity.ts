import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

import {
    Length,
    IsEmail,
    IsStrongPassword,
    IsDate,
    IsPhoneNumber,
    IsOptional,

} from 'class-validator';

import {Role} from "./role.entity";
//todo changer le nom de cette class en employee
@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn({ name: 'user_id' })
    userId: number;

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
}