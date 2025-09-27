import { Controller, Get, HttpStatus, Param } from "@nestjs/common";
import { FindCourseByCategoriesUseCase } from "./find-course-by-categories.use-case";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CourseResponseDto } from "src/course/models/dtos/courses-reponse.dto";

@ApiTags("Courses")
@Controller("courses")
export class FindCourseByCategoriesController {
    constructor(
        private readonly findCoursesByCategoriesUseCase: FindCourseByCategoriesUseCase
    ) { }

    @Get("/find-by-categories/:categories")
    @ApiOperation({ summary: 'Busca cursos por categoria.' })
    @ApiParam({ name: 'categories', example: '[1,2,3,4]' })
    @ApiResponse({ status: HttpStatus.OK, type: [CourseResponseDto] })
    async find(
        @Param("categories") categories: string,
    ) {
        return await this.findCoursesByCategoriesUseCase.execute(categories)
    }
}