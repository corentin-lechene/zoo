import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, DeleteDateColumn} from 'typeorm';
import {Course} from "./course.entity";

@Entity({ name: 'space' })
export class Space {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({name: 'name'})
    name: string;

    @ManyToOne(() => Course, (course) => course.spaces)
    courses: Course[]

    @DeleteDateColumn()
    deletedAt: Date;
}
