import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity({ name: 'zoo' })
export class Zoo {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'open_at' })
    openAt: string;

    @Column({ name: 'closed_at' })
    closedAt: string;
}
