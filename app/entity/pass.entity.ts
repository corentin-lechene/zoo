import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    DeleteDateColumn,
    ManyToMany, JoinTable
} from 'typeorm';
import {Space} from "./space.entity";

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

    @DeleteDateColumn()
    deletedAt: Date;
}
