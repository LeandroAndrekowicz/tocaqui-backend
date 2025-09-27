import { ConflictException, Injectable } from "@nestjs/common";
import { MethodEnum } from "src/common/enums/method.enum";
import { handleUnexpectedError } from "src/common/functions/handle-unexpected-error.function";
import { PersonRepository } from "src/person/repositories/person.repository";

@Injectable()
export class FindPersonByEmailUseCase {
    constructor(
        private readonly personRepository: PersonRepository
    ) { }

    async execute(email: string, isCreateAccount?: boolean) {
        try {
            const person = await this.personRepository.findByEmail(email);

            if (person && isCreateAccount) {
                throw new ConflictException("Já existe uma conta vinculada a esse endereço de email.");
            }

            return person;
        } catch (error) {
            handleUnexpectedError(error, FindPersonByEmailUseCase.name, MethodEnum.GET, "Ocorreu um problema ao buscar usuario por email, por favor entre em contato com o suporte.");
        }
    }
}