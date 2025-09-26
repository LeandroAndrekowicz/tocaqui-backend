import { Module } from "@nestjs/common";
import { PersonModule } from "src/person/person.module";
import { LoginUseCase } from "./use-cases/login/login.use-case";
import { LoginController } from "./use-cases/login/login.controller";
import { JwtModule } from "@nestjs/jwt";
import { UserSessionModule } from "src/user-session/user-session.module";

@Module({
    imports: [
        PersonModule,
        JwtModule,
        UserSessionModule
    ],
    controllers: [
        LoginController
    ],
    providers: [
        LoginUseCase
    ],
    exports: [],
})
export class AuthModule {}