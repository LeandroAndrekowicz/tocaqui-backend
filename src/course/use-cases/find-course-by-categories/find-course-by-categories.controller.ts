import { Controller, Get, Param } from "@nestjs/common";
import { FindCourseByCategoriesUseCase } from "./find-course-by-categories.use-case";

@Controller("courses")
export class FindCourseByCategoriesController {
    constructor(
        private readonly findCoursesByCategoriesUseCase: FindCourseByCategoriesUseCase
    ) {}

    @Get("/find-by-categories/:categories")
    async find(
        @Param("categories") categories: string,
    ) {
        return await this.findCoursesByCategoriesUseCase.execute(categories)
    }
}