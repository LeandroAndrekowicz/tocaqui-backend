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

@Module({
    imports: [
        TypeOrmModule.forFeature([PersonEntity]),
        CredentialModule,
        AuthorityModule
    ],
    controllers: [
        CreateAccountController,
        ActivateAccountController
    ],
    providers: [
        PersonRepository,
        CreateAccountUseCase,
        FindPersonByCpfUseCase,
        ActivateAccountUseCase
    ],
    exports: [
        FindPersonByCpfUseCase
    ],
})
export class PersonModule {}