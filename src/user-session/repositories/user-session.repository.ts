import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserSessionEntity } from "../models/entities/user-session.entity";
import { DeepPartial, Repository } from "typeorm";

@Injectable()
export class UserSessionRepository {
    constructor (
        @InjectRepository(UserSessionEntity)
        private readonly userSessionRepository: Repository<UserSessionEntity>
    ) {}

    async create(userSession: DeepPartial<UserSessionEntity>): Promise<UserSessionEntity> {
        const userSessionCreated = this.userSessionRepository.create(userSession);
        return await this.userSessionRepository.save(userSessionCreated);
    }
}