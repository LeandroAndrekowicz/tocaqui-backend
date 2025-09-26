import { Controller, Get } from "@nestjs/common";
import { FindAllCoursesUseCase } from "./find-all-courses.use-case";

@Controller("courses")
export class FindAllCoursesController {
    constructor (
        private readonly findAllCoursesUseCase: FindAllCoursesUseCase
    ) {}

    @Get("/find-all")
    async find() {
        return await this.findAllCoursesUseCase.execute();
    }
}