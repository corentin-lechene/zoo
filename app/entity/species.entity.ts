import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import {Length} from 'class-validator';
import {Space} from "./space.entity";
import {Animal} from "./animal.entity";

@Entity({name: 'species'})
export class Species {
    @PrimaryGeneratedColumn({ name: 'species_id' })
    speciesId: number;

    @Column({ name: 'name', length: 48 })
    @Length(1, 48)
    name: string;

    @Column({name: 'origin', length: 150})
    @Length(1, 150)
    origin: string;
}