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