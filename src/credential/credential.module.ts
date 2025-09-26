import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CredentialEntity } from "./models/entities/credential.entity";
import { CreateCredentialsUseCase } from "./use-cases/create-credentials.use-case";
import { CredentialsRepository } from "./repositories/credentials.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([CredentialEntity])
    ],
    controllers: [],
    providers: [
        CredentialsRepository,
        CreateCredentialsUseCase
    ],
    exports: [
        CreateCredentialsUseCase
    ],
})
export class CredentialModule {}