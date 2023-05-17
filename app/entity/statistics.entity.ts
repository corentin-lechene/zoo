import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    DeleteDateColumn,
    ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn
} from 'typeorm';
import {Space} from "./space.entity";

@Entity({ name: 'statistics' })
export class Statistics {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @ManyToOne(() => Space, (space) => space.maintenances)
    @JoinColumn()
    space: Space

    @Column({name: "visitors_number"})
    visitorsNumber: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
