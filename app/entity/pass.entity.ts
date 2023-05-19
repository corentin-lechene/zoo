import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    DeleteDateColumn,
    ManyToMany, JoinTable
} from 'typeorm';
import {Space} from "./space.entity";
import {ManipulateType} from "dayjs";

@Entity({ name: 'pass' })
export class Pass {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({name: 'name'})
    name: string;

    @ManyToMany(() => Space)
    @JoinTable()
    access: Space[];

    @Column({name: 'price', type: 'float'})
    price: number;

    @Column({name: 'course', default: false})
    course: boolean;

    @Column({name: 'limit', nullable: true})
    limit?: number;

    @Column({name: 'frequency', type: 'varchar', nullable: true})
    frequency?: ManipulateType;

    @Column({name: 'duration', type: 'varchar'})
    duration: number;

    @Column({name: 'period', type: "varchar"})
    period: ManipulateType;

    @Column({name: 'days', type: 'json', nullable: true })
    days?: number[];

    @Column({name: 'start_hour' })
    entryHour: string;

    @Column({name: 'end_hour' })
    endHour: string;

    @DeleteDateColumn()
    deletedAt: Date;
}
