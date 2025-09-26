import { Injectable, UnauthorizedException } from "@nestjs/common";
import { MethodEnum } from "src/common/enums/method.enum";
import { handleUnexpectedError } from "src/common/functions/handle-unexpected-error.function";
import { ActivateAccountDto } from "src/person/models/dtos/activate-account.dto";
import { PersonRepository } from "src/person/repositories/person.repository";
import { FindPersonByCpfUseCase } from "src/person/use-cases/find-person-by-cpf/find-person-by-cpf.use-case";

@Injectable()
export class ActivateAccountUseCase {
    constructor (
        private readonly findPersonByCpfUseCase: FindPersonByCpfUseCase,
        private readonly personRepository: PersonRepository
    ) {}

    async execute(body: ActivateAccountDto) {
        try {
            const person = await this.findPersonByCpfUseCase.execute(body.cpf, false);

            if(person[0].isActive) {
                return {
                    message: "A conta já está ativa."
                }
            }

            if(person[0].credentials[0].activationToken !== body.code) {
                throw new UnauthorizedException("O código informado é inválido.");
            }

            await this.personRepository.activatePerson(person[0].id);

            return {
                message: "Conta ativada com sucesso."
            }
        } catch (error) {
            handleUnexpectedError(error, ActivateAccountUseCase.name, MethodEnum.CREATE, "Ocorreu um erro ao validar o código, por favor entre em contato com o suporte.");
        }
    }
}