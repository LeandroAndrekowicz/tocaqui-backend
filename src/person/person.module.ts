import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PersonEntity } from "./models/entities/person.entity";
import { CreateAccountUseCase } from "./use-cases/create-account/create-account.use-case";
import { PersonRepository } from "./repositories/person.repository";
import { CredentialModule } from "src/credential/credential.module";
import { CreateAccountController } from "./use-cases/create-account/create-account.controller";
import { FindPersonByCpfUseCase } from "./use-cases/find-person-by-cpf/find-person-by-cpf.use-case";

@Module({
    imports: [
        TypeOrmModule.forFeature([PersonEntity]),
        CredentialModule
    ],
    controllers: [
        CreateAccountController
    ],
    providers: [
        PersonRepository,
        CreateAccountUseCase,
        FindPersonByCpfUseCase
    ],
    exports: [],
})
export class PersonModule {}