import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { LoginUseCase } from "src/auth/use-cases/login/login.use-case";
import { MethodEnum } from "src/common/enums/method.enum";
import { handleUnexpectedError } from "src/common/functions/handle-unexpected-error.function";
import { ActivateAccountDto } from "src/person/models/dtos/activate-account.dto";
import { PersonRepository } from "src/person/repositories/person.repository";
import { FindPersonByCpfUseCase } from "src/person/use-cases/find-person-by-cpf/find-person-by-cpf.use-case";

@Injectable()
export class ActivateAccountUseCase {
    constructor(
        private readonly findPersonByCpfUseCase: FindPersonByCpfUseCase,
        private readonly personRepository: PersonRepository,
    ) { }

    async execute(body: ActivateAccountDto) {
        try {
            const person = await this.findPersonByCpfUseCase.execute(body.cpf, false);

            if (!person) {
                throw new NotFoundException(`Pessoa não encontrada.`);
            }

            if (person.isActive) {
                return {
                    message: "A conta já está ativa."
                }
            }

            if (person.credentials[0].activationToken !== body.code) {
                throw new UnauthorizedException("O código informado é inválido.");
            }

            await this.personRepository.activatePerson(person.id);

            return {
                message: "Conta ativada com sucesso.",
                token: person.userSessions[0].accessToken
            }
        } catch (error) {
            handleUnexpectedError(error, ActivateAccountUseCase.name, MethodEnum.CREATE, "Ocorreu um erro ao validar o código, por favor entre em contato com o suporte.");
        }
    }
}