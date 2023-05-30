import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    DeleteDateColumn,
    ManyToMany, JoinTable
} from 'typeorm';
import {Space} from "./space.entity";
import {ManipulateType} from "dayjs";
import {IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Length, Min} from "class-validator";

@Entity({ name: 'pass' })
export class Pass {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({name: 'name'})
    @Length(1, 48)
    name: string;

    @ManyToMany(() => Space)
    @JoinTable()
    access: Space[];

    @Column({name: 'price', type: 'float'})
    @IsNumber({maxDecimalPlaces: 2})
    price: number;

    @Column({name: 'course', default: false})
    @IsBoolean()
    course: boolean;

    @Column({name: 'limit', nullable: true})
    @IsOptional()
    @IsInt()
    @Min(1)
    limit?: number;

    @Column({name: 'frequency', type: 'varchar', nullable: true})
    @IsOptional()
    @IsIn(['day', 'month', 'year', 'week'])
    frequency?: ManipulateType;

    @Column({name: 'duration', type: 'varchar'})
    @IsInt()
    @Min(1)
    duration: number;

    @Column({name: 'period', type: "varchar"})
    @IsIn(['day', 'month', 'year', 'week'])
    period: ManipulateType;

    @Column({name: 'days', type: 'json', nullable: true })
    days?: number[];

    @Column({name: 'start_hour' })
    @IsString()
    entryHour: string;

    @Column({name: 'end_hour' })
    @IsString()
    endHour: string;

    @DeleteDateColumn()
    deletedAt: Date;
}
