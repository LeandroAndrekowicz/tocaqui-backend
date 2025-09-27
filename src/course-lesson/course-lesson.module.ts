import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CourseLessonEntity } from "./models/entities/course-lesson.entity";
import { CreateCourseLessonUseCase } from "./use-cases/create-course-lesson/create-course-lesson.use-case";
import { CourseLessonRepository } from "./repositories/course-lesson.repository";
import { DaysModule } from "src/days/days.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([CourseLessonEntity]),
        DaysModule
    ],
    controllers: [],
    providers: [
        CourseLessonRepository,
        CreateCourseLessonUseCase
    ],
    exports: [
        CreateCourseLessonUseCase
    ]
})
export class CourseLessonModule {}