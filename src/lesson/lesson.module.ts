import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LessonEntity } from "./models/entities/lesson.entity";
import { CreateLessonUseCase } from "./use-cases/create-lesson/create-lesson.use-case";
import { LessonRepository } from "./repositories/lesson.repository";
import { PersonModule } from "src/person/person.module";
import { CourseModule } from "src/course/course.module";
import { CourseLessonModule } from "src/course-lesson/course-lesson.module";
import { CreateLessonController } from "./use-cases/create-lesson/create-lesson.controller";
import { FindLessonByIdUseCase } from "./use-cases/find-lesson-by-id/find-lesson-by-id.use-case";
import { UpdateLessonStatusController } from "./use-cases/update-lesson-status/update-lesson-status.controller";
import { UpdateLessonStatusUseCase } from "./use-cases/update-lesson-status/update-lesson-status.use-case";
import { FindLessonByPersonIdUseCase } from "./use-cases/find-lesson-by-person-id/find-lesson-by-person-id.use-case";
import { FindLessonByPersonIdController } from "./use-cases/find-lesson-by-person-id/find-lesson-by-person-id.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([LessonEntity]),
        PersonModule,
        CourseModule,
        CourseLessonModule
    ],
    controllers: [
        CreateLessonController,
        UpdateLessonStatusController,
        FindLessonByPersonIdController
    ],
    providers: [
        LessonRepository,
        CreateLessonUseCase,
        FindLessonByIdUseCase,
        UpdateLessonStatusUseCase,
        FindLessonByPersonIdUseCase
    ],
    exports: []
})
export class LessonModule {}