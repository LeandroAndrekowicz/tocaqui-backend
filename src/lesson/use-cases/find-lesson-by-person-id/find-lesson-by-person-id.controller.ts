import { Controller, Get, Param, Query } from "@nestjs/common";
import { FindLessonByPersonIdUseCase } from "./find-lesson-by-person-id.use-case";
import { ApiTags } from "@nestjs/swagger";
import { FindLessonsQueryDto } from "src/lesson/models/dtos/find-lessons-query.dto";

@ApiTags('Lessons')
@Controller('lessons')
export class FindLessonByPersonIdController {
    constructor(
        private readonly findLessonByPersonIdUseCase: FindLessonByPersonIdUseCase
    ) { }

    @Get('/find-by')
    async find(
        @Query() query: FindLessonsQueryDto
    ) {
        return await this.findLessonByPersonIdUseCase.execute(query);
    }
}