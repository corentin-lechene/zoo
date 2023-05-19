import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from 'typeorm';
import {Length,} from 'class-validator';

import {Animal} from "./animal.entity";
@Entity({ name: 'tracking_book'})
//TODO AJOUTER LA RELATION AVEC EMPLOYEE QUAND L'ENTITE SERA DISPO
export class TrackingBook {

    @PrimaryGeneratedColumn({ name: 'tracking_book_id' })
    trackingBookId: number;

    @Column({ type: 'text', nullable: true})
    @Length(0, 100)
    treatmentDescription?: string;

    @Column({ type: "datetime" })
    treatmentDate: Date;

    @OneToOne(() => Animal)
    @JoinColumn()
    animal: Animal;
}