import { Injectable } from "@nestjs/common";
import { DisponibleDaysEnum } from "src/common/enums/disponible-days.enum";
import { MethodEnum } from "src/common/enums/method.enum";
import { handleUnexpectedError } from "src/common/functions/handle-unexpected-error.function";

@Injectable()
export class FindDisponibleDaysUseCase {
    constructor() { }

    async execute() {
        try {
            return {
                message: "Sucesso ao buscar dias disponiveis",
                disponibleDays: Object.values(DisponibleDaysEnum)
            }
        } catch (error) {
            handleUnexpectedError(error, FindDisponibleDaysUseCase.name, MethodEnum.GET, "Ocorreu um problema ao buscar dias disponíveis, por favor entre em contato com o suporte.");
        }
    }
}