import {Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, ManyToOne, JoinColumn} from 'typeorm';
import {Ticket} from "./ticket.entity";
import {Space} from "./space.entity";

@Entity({name: 'space_history'})
export class SpaceHistory {
    @PrimaryGeneratedColumn({name: 'id'})
    id: number;

    @ManyToOne(() => Ticket, (ticket: Ticket) => ticket.spacesHistories)
    @JoinColumn()
    ticket: Ticket;

    @ManyToOne(() => Space, (space: Space) => space.spacesHistories)
    @JoinColumn()
    space: Space;

    @Column({name: 'entry_at'})
    entryAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}