import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PersonEntity } from "./models/entities/person.entity";
import { CreateAccountUseCase } from "./use-cases/create-account/create-account.use-case";
import { PersonRepository } from "./repositories/person.repository";
import { CredentialModule } from "src/credential/credential.module";
import { CreateAccountController } from "./use-cases/create-account/create-account.controller";
import { FindPersonByCpfUseCase } from "./use-cases/find-person-by-cpf/find-person-by-cpf.use-case";
import { AuthorityModule } from "src/authority/authority.module";
import { ActivateAccountUseCase } from "./use-cases/activate-account/activate-account.use-case";
import { ActivateAccountController } from "./use-cases/activate-account/activate-account.controller";
import { FindPersonByIdUseCase } from "./use-cases/find-person-by-id/find-person-by-id.use-case";
import { FindPersonByEmailUseCase } from "./use-cases/find-person-by-email/find-person-by-email.use-case";
import { FindPersonByPhoneUseCase } from "./use-cases/find-person-by-phone/find-person-by-phone.use-case";
import { EmailModule } from "src/email/email.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([PersonEntity]),
        CredentialModule,
        AuthorityModule,
        EmailModule
    ],
    controllers: [
        CreateAccountController,
        ActivateAccountController
    ],
    providers: [
        PersonRepository,
        CreateAccountUseCase,
        FindPersonByCpfUseCase,
        ActivateAccountUseCase,
        FindPersonByIdUseCase,
        FindPersonByEmailUseCase,
        FindPersonByPhoneUseCase
    ],
    exports: [
        FindPersonByCpfUseCase,
        FindPersonByIdUseCase
    ],
})
export class PersonModule {}