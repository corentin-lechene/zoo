import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    DeleteDateColumn,
    ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn
} from 'typeorm';
import {Space} from "./space.entity";

@Entity({ name: 'maintenance' })
export class Maintenance {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @ManyToOne(() => Space, (space) => space.maintenances)
    @JoinColumn()
    space: Space

    @Column({name: "description"})
    description: string;

    @Column({name: "start_date_maintenance"})
    startDateMaintenance: Date;

    @Column({name: "finish_date_maintenance"})
    finishDateMaintenance: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
