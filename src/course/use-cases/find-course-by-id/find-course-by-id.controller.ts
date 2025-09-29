import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { FindCourseByIdUseCase } from "./find-course-by-id.use-case";
import { plainToInstance } from "class-transformer";
import { CourseResponseDto } from "src/course/models/dtos/courses-reponse.dto";

@ApiTags("Courses")
@Controller("courses")
export class FindCourseByIdController {
    constructor(
        private readonly findCourseByIdUseCase: FindCourseByIdUseCase
    ) { }

    @Get("/find-by/:courseId")
    async find(
        @Param("courseId") courseId: string
    ) {
        const courses = await this.findCourseByIdUseCase.execute(+courseId);

        return plainToInstance(CourseResponseDto, courses, {
            excludeExtraneousValues: true
        })
    }
}