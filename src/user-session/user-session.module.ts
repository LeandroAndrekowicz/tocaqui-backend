import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserSessionEntity } from "./models/entities/user-session.entity";
import { CreateUserSessionUseCase } from "./use-cases/create-user-session.use-case";
import { UserSessionRepository } from "./repositories/user-session.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserSessionEntity])
    ],
    controllers: [],
    providers: [
        CreateUserSessionUseCase,
        UserSessionRepository
    ],
    exports: [
        CreateUserSessionUseCase
    ],
})
export class UserSessionModule {}