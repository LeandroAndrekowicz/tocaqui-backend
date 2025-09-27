import { CourseEntity } from "src/course/models/entities/course.entity";
import { DaysEntity } from "src/days/models/entities/days.entity";
import { LessonEntity } from "src/lesson/models/entities/lesson.entity";
import { Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'course_lesson'})
export class CourseLessonEntity {
    @PrimaryGeneratedColumn('increment', {type: 'bigint'})
    id: number;

    @ManyToOne(() => LessonEntity, lesson => lesson.courseLesson)
    @JoinColumn({name: 'id_lesson', foreignKeyConstraintName: 'fk_lesson_course'})
    lesson: LessonEntity;

    @ManyToOne(() => CourseEntity, course => course.courseLesson)
    @JoinColumn({name: 'id_course', foreignKeyConstraintName: 'fk_course_lesson'})
    course: CourseEntity;

    @OneToMany(() => DaysEntity, day => day.courseLesson)
    days: DaysEntity[]
}