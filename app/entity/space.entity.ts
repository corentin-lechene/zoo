import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    DeleteDateColumn,
    UpdateDateColumn,
    CreateDateColumn,
    OneToMany, VirtualColumn
} from 'typeorm';
import {Maintenance} from "./maintenance.entity";
import {Species} from "./species.entity";
import {Animal} from "./animal.entity";
import {SpaceHistory} from "./spaceHistory.entity";

export enum SpaceStatus {
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

    @OneToMany(() => Animal, (animal) => animal.space)
    animals: Animal[];

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

    @OneToMany(() => Maintenance, (maintenance) => maintenance.space)
    maintenances: Maintenance[];

    @OneToMany(() => SpaceHistory, (spaceHistory) => spaceHistory.space)
    spacesHistories: SpaceHistory[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
