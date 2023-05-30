import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, DeleteDateColumn, OneToMany} from 'typeorm';
import {Visitor} from "./visitor.entity";
import {Pass} from "./pass.entity";
import {TicketHistory} from "./ticketHistory.entity";
import {SpaceHistory} from "./spaceHistory.entity";

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

    @OneToMany(() => TicketHistory, (ticketHistory) => ticketHistory.ticket)
    ticketHistory: TicketHistory[];

    @OneToMany(() => SpaceHistory, (spacesHistories) => spacesHistories.ticket)
    spacesHistories: SpaceHistory[];

    @Column({name: 'expire_at', nullable: true, default: null})
    expireAt?: Date;

    @Column({name: 'status', type: "varchar"})
    status: TicketStatus;

    @DeleteDateColumn()
    deletedAt: Date;
}
