import { BadRequestException, Injectable } from "@nestjs/common";
import { MethodEnum } from "src/common/enums/method.enum";
import { handleUnexpectedError } from "src/common/functions/handle-unexpected-error.function";
import { CreateDisponibleDaysDto } from "src/disponible-days/models/dtos/create-disponible-days.dto";
import { DisponibleDaysEntity } from "src/disponible-days/models/entities/disponible-days.entity";
import { DisponibleDaysRepository } from "src/disponible-days/repositories/disponible-days.repository";
import { DeepPartial } from "typeorm";

@Injectable()
export class CreateDisponibleDaysUseCase {
    constructor (
        private readonly disponibleDaysRepository: DisponibleDaysRepository
    ) {}

    async execute(body: CreateDisponibleDaysDto) {
        try {
            if(!body.days.length) {
                throw new BadRequestException('Deve ser fornecido pelo menos um dia disponível para cadastro do curso.');
            }

            Promise.all(
                body.days.map(async (day) => {
                    const dayToCreate: DeepPartial<DisponibleDaysEntity> = {
                        course: {
                            id: body.courseId,
                        },
                        day: day
                    }

                    await this.disponibleDaysRepository.create(dayToCreate);
                })
            )

            return {
                message: 'Dias adicionados com sucesso.'
            }
        } catch (error) {
            handleUnexpectedError(error, CreateDisponibleDaysUseCase.name, MethodEnum.CREATE, "Ocorreu um problema ao criar os dias disponíveis, por favor entre em contato com o suporte.");
        }
    }
}