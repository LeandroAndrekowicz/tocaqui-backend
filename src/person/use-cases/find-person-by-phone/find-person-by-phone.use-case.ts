import { ConflictException, Injectable } from "@nestjs/common";
import { MethodEnum } from "src/common/enums/method.enum";
import { handleUnexpectedError } from "src/common/functions/handle-unexpected-error.function";
import { PersonRepository } from "src/person/repositories/person.repository";

@Injectable()
export class FindPersonByPhoneUseCase {
    constructor(
        private readonly personRepository: PersonRepository
    ) { }

    async execute(phone: string, isCreateAccount?: boolean) {
        try {
            const person = await this.personRepository.findByPhone(phone);

            if (person && isCreateAccount) {
                throw new ConflictException("Já existe uma conta vinculada a esse telefone.");
            }

            return person;
        } catch (error) {
            handleUnexpectedError(error, FindPersonByPhoneUseCase.name, MethodEnum.GET, "Ocorreu um problema ao buscar usuario pelo telefone, por favor entre em contato com o suporte.");
        }
    }
}