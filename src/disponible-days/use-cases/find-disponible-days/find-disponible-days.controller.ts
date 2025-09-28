import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { FindDisponibleDaysUseCase } from "./find-disponible-days.use-case";

@ApiTags("Disponible days")
@Controller("disponible-days")
export class FindDisponibleDaysController {
    constructor(
        private readonly findDisponibleDaysUseCase: FindDisponibleDaysUseCase
    ) { }

    @Get("/find")
    @ApiOperation({ summary: "Busca todos dias disponíveis" })
    async find() {
        return await this.findDisponibleDaysUseCase.execute();
    }
}