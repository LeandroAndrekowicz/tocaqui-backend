import { DisponibleDaysEnum } from "src/common/enums/disponible-days.enum";
import { CourseEntity } from "src/course/models/entities/course.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'disponible_days' })
export class DisponibleDaysEntity {
    @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id' })
    id: number;

    @Column({ name: 'day', type: 'enum', enum: DisponibleDaysEnum, nullable: false })
    day: DisponibleDaysEnum;

    @ManyToOne(() => CourseEntity, course => course.disponibleDays)
    @JoinColumn({ name: 'id_course', foreignKeyConstraintName: 'fk_couse' })
    course: CourseEntity;
}