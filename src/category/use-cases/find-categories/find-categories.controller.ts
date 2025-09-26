import { Controller, Get } from "@nestjs/common";
import { FindCategoriesUseCase } from "./find-categories.use-case";

@Controller('categories')
export class FindCategoriesController {
    constructor (
        private readonly findCategoriesUseCase: FindCategoriesUseCase
    ) {}

    @Get('/find-all')
    async find() {
        return await this.findCategoriesUseCase.execute();
    }
}