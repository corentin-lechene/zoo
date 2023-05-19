import {Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, ManyToOne} from 'typeorm';
import {Ticket} from "./ticket.entity";

@Entity({name: 'ticket_history'})
export class TicketHistory {
    @PrimaryGeneratedColumn({name: 'id'})
    id: number;

    @ManyToOne(() => Ticket)
    ticket: Ticket;

    @Column({name: 'entry_at'})
    entryAt: Date;

    @Column({name: 'exit_at', default: null})
    exitAt?: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
