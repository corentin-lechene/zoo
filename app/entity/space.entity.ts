import {Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, UpdateDateColumn, CreateDateColumn} from 'typeorm';

export enum StatusEnum {
    OPEN = 'OPEN',
    CLOSED = 'CLOSED',
    UNDER_MAINTENANCE = 'UNDER MAINTENANCE'
}

export enum TypeEnum {
    COURSE = 'COURSE',
    FREE_EXPOSITION = 'FREE EXPOSITION'
}

@Entity({ name: 'space' })
export class Space {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({name: 'name'})
    name: string;

    @Column({name: 'description'})
    description: string;

    @Column({name: 'image'})
    image: string;

    @Column({name: 'capacity'})
    capacity: number;

    @Column({name: 'type'})
    type: string;

    @Column({name: 'opening_time'})
    openingTime: string;

    @Column({name: 'closure_hour'})
    closureHour: string;

    @Column({name: 'access_handicap'})
    accessHandicap: boolean;

    @Column({name: 'status'})
    status: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
