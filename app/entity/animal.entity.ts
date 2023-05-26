import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany,} from 'typeorm';
import {Length,} from 'class-validator';

import {Species} from "./species.entity";
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
    specie: Species;

    @ManyToOne(() => Space)
    space: Space;
}