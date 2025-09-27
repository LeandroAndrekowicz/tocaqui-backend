import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DaysEntity } from "../models/entities/days.entity";
import { DeepPartial, Repository } from "typeorm";

@Injectable()
export class DaysRepository {
    constructor (
        @InjectRepository(DaysEntity)
        private readonly daysRepository: Repository<DaysEntity>
    ) {}

    async create(body: DeepPartial<DaysEntity>) {
        const dayToCreate = this.daysRepository.create(body);
        return await this.daysRepository.save(dayToCreate);
    }
}