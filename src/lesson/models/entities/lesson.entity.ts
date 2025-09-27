import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LessonStatusEnum } from "../enums/lesson-status.enum";
import { PersonEntity } from "src/person/models/entities/person.entity";
import { CourseLessonEntity } from "src/course-lesson/models/entities/course-lesson.entity";

@Entity({ name: 'lessons' })
export class LessonEntity {
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    id: number;

    @Column({ type: 'enum', enum: LessonStatusEnum, name: 'status', default: LessonStatusEnum.PENDING, nullable: false })
    status: LessonStatusEnum;

    @ManyToOne(() => PersonEntity, person => person.professorLesson)
    @JoinColumn({ name: 'id_professor', foreignKeyConstraintName: 'fk_professor_id' })
    professor: PersonEntity;

    @ManyToOne(() => PersonEntity, person => person.studentLesson)
    @JoinColumn({ name: 'id_student', foreignKeyConstraintName: 'fk_student_id' })
    student: PersonEntity;

    @OneToMany(() => CourseLessonEntity, courseLesson => courseLesson.lesson)
    courseLesson: CourseLessonEntity[]
}