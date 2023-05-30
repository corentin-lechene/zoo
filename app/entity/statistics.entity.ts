import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    DeleteDateColumn,
    ManyToOne, JoinColumn, CreateDateColumn
} from 'typeorm';
import {Space} from "./space.entity";

export enum typeStatsEnum {
    DAILY_STATS = "Daily Statistics",
    WEEKLY_STATS = "Weekly Statistics",
    MONTHLY_STATS = "Monthly Statistics"
}

@Entity({ name: 'statistics' })
export class Statistics {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @ManyToOne(() => Space, (space) => space.maintenances)
    @JoinColumn()
    space: Space

    @Column({name: "visitors_number"})
    visitorsNumber: number;

    @Column({name: "type"})
    type: string;

    @Column({name: "from"})
    from: Date;

    @Column({name: "to"})
    to: Date;

    @CreateDateColumn()
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
