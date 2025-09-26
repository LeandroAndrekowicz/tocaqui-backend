import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthorityEntity } from "./models/entities/authority.entity";
import { CreateAuthorityUseCase } from "./use-cases/create-authority/create-authority.use-case";
import { AuthorityRepository } from "./repositories/authority.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([AuthorityEntity])
    ],
    controllers: [],
    providers: [
        AuthorityRepository,
        CreateAuthorityUseCase,
    ],
    exports: [
        CreateAuthorityUseCase
    ]
})
export class AuthorityModule {}