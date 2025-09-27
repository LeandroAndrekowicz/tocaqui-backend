import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CourseEntity } from "../models/entities/course.entity";
import { DeepPartial, In, Repository } from "typeorm";

@Injectable()
export class CourseRepository {
    constructor (
        @InjectRepository(CourseEntity)
        private readonly courseRepository: Repository<CourseEntity>
    ) {}

    async create(data: DeepPartial<CourseEntity>) {
        const course = this.courseRepository.create(data);
        return await this.courseRepository.save(course);
    }

    async findAll() {
        return await this.courseRepository.find({
            relations: {
                professor: true,
                category: true,
                disponibleDays: true,
            }
        })
    }

    async findByCategories(categories: number[]) {
        return await this.courseRepository.find({
            where: {
                category: {
                    id: In(categories)
                }
            },
            relations: {
                professor: true,
                category: true,
                disponibleDays: true,
            }
        })
    }

    async findById(courseId: number): Promise<CourseEntity | null> {
        return await this.courseRepository.findOne({
            where: {
                id: courseId
            }
        })
    }
}