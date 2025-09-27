import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CourseLessonEntity } from "../models/entities/course-lesson.entity";
import { DeepPartial, Repository } from "typeorm";

@Injectable()
export class CourseLessonRepository {
    constructor (
        @InjectRepository(CourseLessonEntity)
        private readonly courseLessonRepository: Repository<CourseLessonEntity>
    ) {}

    async create(body: DeepPartial<CourseLessonEntity>) {
        const newCourseLesson = this.courseLessonRepository.create(body);
        return await this.courseLessonRepository.save(newCourseLesson);
    }
}