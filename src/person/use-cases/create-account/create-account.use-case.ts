import { Injectable } from "@nestjs/common";
import { MethodEnum } from "src/common/enums/method.enum";
import { handleUnexpectedError } from "src/common/functions/handle-unexpected-error.function";
import { CreateCredentialsUseCase } from "src/credential/use-cases/create-credentials.use-case";
import { CreatePersonWithCredentialDto } from "src/person/models/dtos/create-account.dto";
import { PersonEntity } from "src/person/models/entities/person.entity";
import { PersonRepository } from "src/person/repositories/person.repository";
import { DeepPartial } from "typeorm";
import { FindPersonByCpfUseCase } from "../find-person-by-cpf/find-person-by-cpf.use-case";
import { CreateAuthorityUseCase } from "src/authority/use-cases/create-authority/create-authority.use-case";
import { FindPersonByEmailUseCase } from "../find-person-by-email/find-person-by-email.use-case";
import { FindPersonByPhoneUseCase } from "../find-person-by-phone/find-person-by-phone.use-case";
import { SendEmailUseCase } from "src/email/use-cases/send-email/send-email.use-case";
import { LoginUseCase } from "src/auth/use-cases/login/login.use-case";
import { CreateUserSessionUseCase } from "src/user-session/use-cases/create-user-session.use-case";
import { CreateUserSessionDto } from "src/user-session/models/dtos/create-user-session.dto";

@Injectable()
export class CreateAccountUseCase {
    constructor(
        private readonly personRepository: PersonRepository,
        private readonly createCredentialUseCase: CreateCredentialsUseCase,
        private readonly findPersonByCpfUseCase: FindPersonByCpfUseCase,
        private readonly createAuthorityUseCase: CreateAuthorityUseCase,
        private readonly findPersonByEmailUseCase: FindPersonByEmailUseCase,
        private readonly findPersonByPhoneUseCase: FindPersonByPhoneUseCase,
        private readonly sendEmailUseCase: SendEmailUseCase,
        private readonly loginUseCase: LoginUseCase,
    ) { }

    async execute(body: CreatePersonWithCredentialDto, ipAddress: string) {
        try {
            await this.findPersonByCpfUseCase.execute(body.cpf, true);
            await this.findPersonByEmailUseCase.execute(body.email, true);
            await this.findPersonByPhoneUseCase.execute(body.mobileNumber, true);

            const personToCreate: DeepPartial<PersonEntity> = {
                cpf: body.cpf,
                email: body.email,
                name: body.name,
                mobileNumber: body.mobileNumber,
                profilePicture: body.profilePicture,
            }

            const person = await this.personRepository.createAccount(personToCreate);
            const credentials = await this.createCredentialUseCase.execute({ password: body.password, personId: person.id });

            await this.createAuthorityUseCase.execute({ personId: person.id, authority: body.authority });
            await this.sendEmailUseCase.execute(body.email, credentials.activationToken);
            await this.loginUseCase.execute({cpf: body.cpf, password: body.password}, ipAddress, true ) 

            return {
                message: "Conta criada com sucesso. Por favor valide seu email",
            }
        } catch (error) {
            handleUnexpectedError(error, CreateAccountUseCase.name, MethodEnum.CREATE, "Ocorrreu um erro ao criar a conta, por favor entre em contato com o suporte.");
        }
    }
}