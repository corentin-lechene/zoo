import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne} from 'typeorm';
import {Course} from "./course.entity";

@Entity({ name: 'pass' })
export class Pass {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({name: 'name'})
    name: string;

    @ManyToOne(() => Course, {nullable: true})
    @JoinColumn()
    course: Course;

    @Column({name: 'price', type: 'float'})
    price: number;
}
