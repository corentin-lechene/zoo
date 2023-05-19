import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToOne, JoinColumn,
} from 'typeorm';

import {
    Length,
    IsEmail,
    IsStrongPassword,
    IsDate,
    IsPhoneNumber,
    IsOptional,

} from 'class-validator';

import {Species} from "./species.entity";
import {TrackingBook} from "./trackingBook.entity";
import {Space} from "./space.entity";
@Entity({name: 'animal'})

export class Animal {

    @PrimaryGeneratedColumn({ name: 'animal_id' })
    animalId: number;

    @Column({ name: 'name', length: 48 })
    @Length(1, 48)
    name: string;

    @Column({ type: "datetime" })
    birthDate: Date;

    @Column({ type: "datetime", nullable: true })
    deathDate?: Date;

    @ManyToOne(() => Species)
    species: Species[];

    @ManyToOne(() => Space)
    space: Space;
}