import {Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn} from 'typeorm';

export enum RoleEnum {
    ADMIN = 'ADMIN',
    RECEPTIONIST = 'RECEPTIONIST',
    HEALER = 'HEALER',
    CLEANER = 'CLEANER',
    SELLER = 'SELLER',
    VETERINARIAN = 'VETERINARIAN'
}

@Entity({ name: 'role' })
export class Role {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'name', length: 48, unique: true })
    name: string;

    @DeleteDateColumn()
    deletedAt: Date;
}
