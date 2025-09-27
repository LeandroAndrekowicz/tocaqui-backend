import { Controller, Get } from "@nestjs/common";
import { FindCategoriesUseCase } from "./find-categories.use-case";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Categories")
@Controller('categories')
export class FindCategoriesController {
    constructor (
        private readonly findCategoriesUseCase: FindCategoriesUseCase
    ) {}

    @Get('/find-all')
    @ApiOperation({ summary: 'Busca todas categorias disponíveis.' })
    async find() {
        return await this.findCategoriesUseCase.execute();
    }
}