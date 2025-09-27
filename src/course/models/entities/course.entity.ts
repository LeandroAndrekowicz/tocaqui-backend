import { CategoryEntity } from "src/category/models/entities/category.entity";
import { CourseLessonEntity } from "src/course-lesson/models/entities/course-lesson.entity";
import { DisponibleDaysEntity } from "src/disponible-days/models/entities/disponible-days.entity";
import { PersonEntity } from "src/person/models/entities/person.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'courses' })
export class CourseEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
    name: string;

    @Column({ name: 'description', type: 'text', nullable: true })
    description: string;

    @Column({ name: 'lesson_price', type: 'decimal', precision: 10, scale: 2, nullable: false })
    lessonPrice: number;

    @Column({ name: 'thumbnail_picture', type: 'varchar', length: 255, nullable: true })
    thumbnailPicture: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ManyToOne(() => CategoryEntity, category => category.courseCategory)
    @JoinColumn({ name: 'id_category', foreignKeyConstraintName: 'fk_course_category' })
    category: CategoryEntity;

    @ManyToOne(() => PersonEntity, person => person.courses, { nullable: false })
    @JoinColumn({ name: 'id_professor', foreignKeyConstraintName: 'fk_course_professor' })
    professor: PersonEntity;

    @OneToMany(() => DisponibleDaysEntity, disponibleDay => disponibleDay.course)
    disponibleDays: DisponibleDaysEntity[]

    @OneToMany(() => CourseLessonEntity, courseLesson => courseLesson.course)
    courseLesson: CourseLessonEntity[]
}