import { CategoryEntity } from "src/category/models/entities/category.entity";
import { PersonEntity } from "src/person/models/entities/person.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'course' })
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
    @JoinColumn({ name: 'category_id', foreignKeyConstraintName: 'fk_course_category' })
    category: CategoryEntity;

    @ManyToOne(() => PersonEntity, person => person.courses, { nullable: false })
    @JoinColumn({ name: 'person_id', foreignKeyConstraintName: 'fk_course_person' })
    person: PersonEntity;
}