import { BadRequestException, Injectable } from "@nestjs/common";
import { MethodEnum } from "src/common/enums/method.enum";
import { handleUnexpectedError } from "src/common/functions/handle-unexpected-error.function";
import { PersonRepository } from "src/person/repositories/person.repository";

@Injectable()
export class FindPersonByIdUseCase {
    constructor(
        private readonly personRepository: PersonRepository,
    ) {}

    async execute(personId: number) {
        try {
            if(!Number(personId)) {
                throw new BadRequestException(`Identificador de pessoa ${personId} inválido.`);
            }

            const person = await this.personRepository.findById(personId);

            if(!person) {
                throw new BadRequestException(`Pessoa com identificador ${personId} não encontrada.`);
            }

            return person;
        } catch (error) {
            handleUnexpectedError(error, FindPersonByIdUseCase.name, MethodEnum.GET, "Ocorreu um problema ao buscar a pessoa pelo identificador, por favor entre em contato com o suporte.");
        }
    }
}