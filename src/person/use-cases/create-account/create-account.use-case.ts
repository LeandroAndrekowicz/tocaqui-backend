import { Injectable } from "@nestjs/common";
import { MethodEnum } from "src/common/enums/method.enum";
import { handleUnexpectedError } from "src/common/functions/handle-unexpected-error.function";
import { CreateCredentialsUseCase } from "src/credential/use-cases/create-credentials.use-case";
import { CreatePersonWithCredentialDto } from "src/person/models/dtos/create-account.dto";
import { PersonEntity } from "src/person/models/entities/person.entity";
import { PersonRepository } from "src/person/repositories/person.repository";
import { DeepPartial } from "typeorm";
import { FindPersonByCpfUseCase } from "../find-person-by-cpf/find-person-by-cpf.use-case";

@Injectable()
export class CreateAccountUseCase {
    constructor(
        private readonly personRepository: PersonRepository,
        private readonly createCredentialUseCase: CreateCredentialsUseCase,
        private readonly findPersonByCpfUseCase: FindPersonByCpfUseCase
    ) {}

    async execute(body: CreatePersonWithCredentialDto) {
        try {
            await this.findPersonByCpfUseCase.execute(body.cpf);

            const personToCreate: DeepPartial<PersonEntity> = {
                cpf: body.cpf,
                email: body.email,
                name: body.name,
                mobileNumber: body.mobileNumber,
                profilePicture: body.profilePicture,
            }

            const person = await this.personRepository.createAccount(personToCreate);

            const credentials = await this.createCredentialUseCase.execute({password: body.password, personId: person.id});

            return {
                message: "Conta criada com sucesso.",
                activationToken: credentials.activationToken
            }
        } catch (error) {
            handleUnexpectedError(error, CreateAccountUseCase.name, MethodEnum.CREATE, "Ocorrreu um erro ao criar a conta, por favor entre em contato com o suporte.");
        }
    }
}