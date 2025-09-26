import { Injectable } from "@nestjs/common";
import { CreateAuthorityDto } from "src/authority/models/dtos/create-authority.dto";
import { AuthorityEntity } from "src/authority/models/entities/authority.entity";
import { AuthorityRepository } from "src/authority/repositories/authority.repository";
import { MethodEnum } from "src/common/enums/method.enum";
import { handleUnexpectedError } from "src/common/functions/handle-unexpected-error.function";
import { DeepPartial } from "typeorm";

@Injectable()
export class CreateAuthorityUseCase {
    constructor (
        private readonly AuthorityRepository: AuthorityRepository,
    ) {}

    async execute(body: CreateAuthorityDto) {
        try {
            const authorityToCreate: DeepPartial<AuthorityEntity> = {
                permission: body.authority,
                person: { 
                    id: body.personId 
                }
            }

            await this.AuthorityRepository.create(authorityToCreate);

            return {
                message: "Autoridade criada com sucesso",
            }
        } catch (error) {
            handleUnexpectedError(error, CreateAuthorityUseCase.name, MethodEnum.CREATE, "Ocorreu um problema ao criar a autoridade, por favor entre em contato com o suporte.");
        }
    }
}