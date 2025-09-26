import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthorityEntity } from "../models/entities/authority.entity";
import { DeepPartial, Repository } from "typeorm";

@Injectable()
export class AuthorityRepository {
    constructor (
        @InjectRepository(AuthorityEntity)
        private readonly authorityRepository: Repository<AuthorityEntity>,
    ) {}

    async create(body: DeepPartial<AuthorityEntity>): Promise<AuthorityEntity> {
        const authority = this.authorityRepository.create(body);
        return this.authorityRepository.save(authority);
    }
}