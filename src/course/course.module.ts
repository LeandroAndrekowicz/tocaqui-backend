import { Module } from "@nestjs/common";
import { CourseRepository } from "./repositories/course.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CourseEntity } from "./models/entities/course.entity";
import { CreateCourseUseCase } from "./use-cases/create-course/create-course.use-case";
import { CreateCourseController } from "./use-cases/create-course/create-course.controller";
import { CategoryModule } from "src/category/category.module";
import { PersonModule } from "src/person/person.module";
import { FindAllCoursesController } from "./use-cases/find-all-courses/find-all-courses.controller";
import { FindAllCoursesUseCase } from "./use-cases/find-all-courses/find-all-courses.use-case";
import { FindCourseByCategoriesController } from "./use-cases/find-course-by-categories/find-course-by-categories.controller";
import { FindCourseByCategoriesUseCase } from "./use-cases/find-course-by-categories/find-course-by-categories.use-case";

@Module({
    imports: [
        TypeOrmModule.forFeature([CourseEntity]),
        CategoryModule,
        PersonModule
    ],
    controllers: [
        CreateCourseController,
        FindAllCoursesController,
        FindCourseByCategoriesController
    ],
    providers: [
        CourseRepository,
        CreateCourseUseCase,
        FindAllCoursesUseCase,
        FindCourseByCategoriesUseCase
    ],
    exports: [],
})
export class CourseModule {}