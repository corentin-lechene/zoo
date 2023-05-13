import {Entity, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {Space} from "./space.entity";

@Entity({ name: 'course' })
export class Course {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @OneToMany(() => Space, (space) => space.courses, {cascade: true, onDelete: 'SET NULL'})
    spaces: Space[];
}
