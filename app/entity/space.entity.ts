import {Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn} from 'typeorm';

@Entity({ name: 'space' })
export class Space {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({name: 'name'})
    name: string;

    @DeleteDateColumn()
    deletedAt: Date;
}
