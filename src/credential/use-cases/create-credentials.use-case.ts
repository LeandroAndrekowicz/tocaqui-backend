import { Injectable } from "@nestjs/common";
import { CreateCredentialDto } from "../models/dtos/create-credential.dto";
import { generateNumericCodeFunction } from "src/common/functions/generate-numeric-code.function";
import { handleUnexpectedError } from "src/common/functions/handle-unexpected-error.function";
import { MethodEnum } from "src/common/enums/method.enum";
import { DeepPartial } from "typeorm";
import { CredentialEntity } from "../models/entities/credential.entity";
import { CredentialsRepository } from "../repositories/credentials.repository";
import { hashPasswordFunction } from "src/common/functions/hash-password.funcion";

@Injectable()
export class CreateCredentialsUseCase {
    constructor(
        private readonly credentialRepository: CredentialsRepository
    ) { }

    async execute(body: CreateCredentialDto): Promise<{ message: string; activationToken: string; }> {
        try {
            const activationToken = generateNumericCodeFunction(6);
            const recoveryToken = generateNumericCodeFunction(6);
            const hashPassword = await hashPasswordFunction(body.password);

            const credentialsToCreate: DeepPartial<CredentialEntity> = {
                activationToken: activationToken,
                recoveryToken: recoveryToken,
                password: hashPassword,
                person: {
                    id: body.personId
                }
            }

            await this.credentialRepository.create(credentialsToCreate);

            return {
                message: "Credenciais criadas com sucesso",
                activationToken
            }

        } catch (error) {
            handleUnexpectedError(error, CreateCredentialsUseCase.name, MethodEnum.CREATE, "Ocorreu um erro ao criar as credenciais, por entre em contato com o suporte" );
        }
    }
}