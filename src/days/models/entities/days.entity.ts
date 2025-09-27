import { DisponibleDaysEnum } from "src/common/enums/disponible-days.enum";
import { CourseLessonEntity } from "src/course-lesson/models/entities/course-lesson.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'days'})
export class DaysEntity {
    @PrimaryGeneratedColumn('increment', {type: 'bigint'})
    id: number;

    @Column({name: 'day', type: 'enum', enum: DisponibleDaysEnum, nullable: false})
    day: DisponibleDaysEnum;

    @ManyToOne(() => CourseLessonEntity, courseLesson => courseLesson.days)
    @JoinColumn({name: 'id_course_lesson', foreignKeyConstraintName: 'fk_course_lesson'})
    courseLesson: CourseLessonEntity;
}