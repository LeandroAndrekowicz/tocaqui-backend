import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CredentialEntity } from "../models/entities/credential.entity";
import { DeepPartial, Repository } from "typeorm";

@Injectable()
export class CredentialsRepository {
    constructor(
        @InjectRepository(CredentialEntity)
        private readonly repository: Repository<CredentialEntity>
    ) { }

    async create(credential: DeepPartial<CredentialEntity> ): Promise<CredentialEntity> {
        const newCredential = this.repository.create(credential);
        return this.repository.save(newCredential);
    }
}