import { Injectable } from "@nestjs/common";
import { UserSessionRepository } from "../repositories/user-session.repository";
import { DeepPartial } from "typeorm";
import { UserSessionEntity } from "../models/entities/user-session.entity";
import { CreateUserSessionDto } from "../models/dtos/create-user-session.dto";
import { handleUnexpectedError } from "src/common/functions/handle-unexpected-error.function";
import { MethodEnum } from "src/common/enums/method.enum";
import { normalizeIp } from "src/common/functions/normalize-ip.function";

@Injectable()
export class CreateUserSessionUseCase {
    constructor(
        private readonly userSessionRepository: UserSessionRepository
    ) { }

    async execute(body: CreateUserSessionDto) {
        try {
            const userSessionToCreate: DeepPartial<UserSessionEntity> = {
                accessToken: body.accessToken,
                refreshToken: body.refreshToken,
                person: {
                    id: body.personId
                },
                ipAddress: normalizeIp(body.ipAddress)
            }

            await this.userSessionRepository.create(userSessionToCreate);

            return {
                message: "Sessão criada com sucesso."
            };
        } catch (error) {
            handleUnexpectedError(error, CreateUserSessionUseCase.name, MethodEnum.CREATE, "Ocorreu um erro ao criar a sessão do usuário, por favor entre em contato com o suporte.");
        }
    }
}