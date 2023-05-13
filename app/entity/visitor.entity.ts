import {Entity, PrimaryGeneratedColumn, Column, OneToMany, DeleteDateColumn} from 'typeorm';
import {Ticket} from "./ticket.entity";

@Entity({ name: 'visitor' })
export class Visitor {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({name: 'firstname'})
    firstname: string;

    @Column({name: 'lastname'})
    lastname: string;

    @Column({name: 'email'})
    email: string;

    @OneToMany(() => Ticket, (ticket) => ticket.visitor)
    tickets: Ticket[];

    @Column({name: 'handicap_access'})
    handicapAccess: boolean;

    @DeleteDateColumn()
    deletedAt: Date;
}
