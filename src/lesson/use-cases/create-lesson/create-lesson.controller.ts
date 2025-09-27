import { Body, Controller, Post } from "@nestjs/common";
import { CreateLessonUseCase } from "./create-lesson.use-case";
import { CreateLessonDto } from "src/lesson/models/dtos/create-lesson.dto";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Lesson")
@Controller("lesson")
export class CreateLessonController {
    constructor (
        private readonly createLessonUseCase: CreateLessonUseCase
    ) {}

    @Post("/create")
    @ApiOperation({ summary: "Criar uma nova aula." })
    @ApiBody({ type: CreateLessonDto })
    async create(
        @Body() body: CreateLessonDto
    ) {
        return await this.createLessonUseCase.execute(body)
    }
}