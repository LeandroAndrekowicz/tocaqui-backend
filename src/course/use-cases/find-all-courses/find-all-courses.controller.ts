import { Controller, Get, HttpStatus } from "@nestjs/common";
import { FindAllCoursesUseCase } from "./find-all-courses.use-case";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CourseResponseDto } from "src/course/models/dtos/courses-reponse.dto";

@ApiTags("Courses")
@Controller("courses")
export class FindAllCoursesController {
    constructor (
        private readonly findAllCoursesUseCase: FindAllCoursesUseCase
    ) {}

    @Get("/find-all")
    @ApiOperation({ summary: 'Busca todos os cursos' })
    @ApiResponse({ status: HttpStatus.OK, type: [CourseResponseDto] })
    async find() {
        return await this.findAllCoursesUseCase.execute();
    }
}