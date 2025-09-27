import { Body, Controller, Post } from "@nestjs/common";
import { CreateCourseUseCase } from "./create-course.use-case";
import { CreateCourseDto } from "src/course/models/dtos/create-course.dto";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Courses")
@Controller("courses")
export class CreateCourseController {
    constructor(
        private readonly createCourseUseCase: CreateCourseUseCase
    ) { }

    @Post('/create')
    @ApiOperation({ summary: 'Criar um novo curso' })
    @ApiBody({ type: CreateCourseDto })
    async create(
        @Body() body: CreateCourseDto
    ) {
        return await this.createCourseUseCase.execute(body)
    }
}