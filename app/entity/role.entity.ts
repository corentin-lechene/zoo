import {Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn} from 'typeorm';

export enum RoleEnum {
    ADMIN = 'ADMIN',
    //todo ajouter les autres roles
    USER = 'USER',
    VETERINARIAN = 'VETERINARIAN'
}

@Entity({ name: 'role' })
export class Role {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'name', length: 48, unique: true })
    name: string;

    @UpdateDateColumn()
    updatedAt: Date;

    @CreateDateColumn()
    createdAt: Date;
}
