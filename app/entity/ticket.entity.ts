import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne} from 'typeorm';
import {Visitor} from "./visitor.entity";
import {Pass} from "./pass.entity";

export enum TicketStatus {
    VALID = "Valid",
    USED = "Used",
}


@Entity({ name: 'ticket' })
export class Ticket {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @ManyToOne(() => Pass)
    @JoinColumn()
    pass: Pass;

    @ManyToOne(() => Visitor, (visitor) => visitor.tickets)
    @JoinColumn()
    visitor: Visitor;

    @Column({name: 'purchase_at'})
    purchaseAt: Date;

    @Column({name: 'status', type: "varchar"})
    status: TicketStatus;
}
