import { CourseEntity } from "src/course/models/entities/course.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'category' })
export class CategoryEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ name: 'name', type: 'varchar', length: 100, nullable: false })
    name: string;

    @Column({ name: 'description', type: 'varchar', length: 255, nullable: true })
    description: string;

    @Column({ name: 'logo_url', type: 'varchar', length: 255, nullable: true })
    logoUrl: string;

    @Column({ name: 'is_active', type: 'boolean', default: true })
    isActive: boolean;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @OneToMany(() => CourseEntity, course => course.category)
    courseCategory: CourseEntity[];
}