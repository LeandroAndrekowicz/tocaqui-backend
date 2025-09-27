import { BadRequestException, Injectable } from "@nestjs/common";
import { MethodEnum } from "src/common/enums/method.enum";
import { handleUnexpectedError } from "src/common/functions/handle-unexpected-error.function";
import { CreateDaysDto } from "src/days/models/dtos/create-days.dto";
import { DaysEntity } from "src/days/models/entities/days.entity";
import { DaysRepository } from "src/days/repositories/days.repository";
import { DeepPartial } from "typeorm";

@Injectable()
export class CreateDayUseCase {
    constructor(
        private readonly daysRepository: DaysRepository
    ) { }

    async execute(body: CreateDaysDto) {
        try {
            if (!body.days.length) {
                throw new BadRequestException('Deve ser fornecido pelo menos um dia disponível para cadastro do curso.');
            }

            Promise.all(
                body.days.map(async (day) => {
                    const dayToCreate: DeepPartial<DaysEntity> = {
                        courseLesson: body.courseLesson,
                        day: day
                    }

                    await this.daysRepository.create(dayToCreate);
                })
            )

            return {
                message: 'Dias adicionados com sucesso.'
            }
        } catch (error) {
            handleUnexpectedError(error, CreateDayUseCase.name, MethodEnum.CREATE, "Ocorreu um problema ao vincular os dias de aula, por favor entre em contato com o suporte.");
        }
    }
}