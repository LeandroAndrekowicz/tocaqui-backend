import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "src/auth/models/dtos/login.dto";
import { MethodEnum } from "src/common/enums/method.enum";
import { handleUnexpectedError } from "src/common/functions/handle-unexpected-error.function";
import { comparePasswordFunction, hashPasswordFunction } from "src/common/functions/hash-password.funcion";
import { PersonEntity } from "src/person/models/entities/person.entity";
import { FindPersonByCpfUseCase } from "src/person/use-cases/find-person-by-cpf/find-person-by-cpf.use-case";
import { CreateUserSessionDto } from "src/user-session/models/dtos/create-user-session.dto";
import { CreateUserSessionUseCase } from "src/user-session/use-cases/create-user-session.use-case";

@Injectable()
export class LoginUseCase {
    constructor(
        private readonly findPersonByCpfUseCase: FindPersonByCpfUseCase,
        private readonly jwtService: JwtService,
        private readonly createUserSessionUseCase: CreateUserSessionUseCase
    ) { }

    async execute(body: LoginDto, ipAddress: string) {
        try {
            const person = await this.findPersonByCpfUseCase.execute(body.cpf, false);

            if (!person.length && !person[0]?.credentials?.length) {
                throw new UnauthorizedException("CPF ou senha inválidos.");
            }

            const personData: PersonEntity = person[0];

            if(!personData.isActive) {
                throw new UnauthorizedException("A conta não está ativa. Por favor, ative sua conta antes de fazer login.");
            }

            const isValidPassword: boolean = await comparePasswordFunction(body.password, personData.credentials[0].password);

            if (!isValidPassword) {
                throw new UnauthorizedException("CPF ou senha inválidos.");
            }

            const token: string = await this.generateTokens(personData, process.env.JWT_EXPIRES_IN ?? '1h');
            const refreshToken: string = await this.generateTokens(personData, process.env.JWT_REFRESH_EXPIRES_IN ?? '7d');
            const userToCreate: CreateUserSessionDto = {
                accessToken: token,
                refreshToken: refreshToken,
                personId: personData.id,
                ipAddress: ipAddress
            }

            await this.createUserSessionUseCase.execute(userToCreate);

            return {
                message: "Login realizado com sucesso.",
                token
            }
        } catch (error) {
            handleUnexpectedError(error, LoginUseCase.name, MethodEnum.CREATE, "Ocorreu um erro ao realizar o login, por favor entre em contato com o suporte.");
        }
    }

    private async generateTokens(personData: PersonEntity, expiresIn: string): Promise<string> {
        return await this.jwtService.signAsync(
            { personId: personData.id, name: personData.name, role: personData.authorities[0].permission },
            { secret: process.env.JWT_SECRET, expiresIn: expiresIn }
        );
    }
}