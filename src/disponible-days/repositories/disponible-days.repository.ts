import { Injectable } from "@nestjs/common";
import { DeepPartial, Repository } from "typeorm";
import { DisponibleDaysEntity } from "../models/entities/disponible-days.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class DisponibleDaysRepository {
    constructor(
        @InjectRepository(DisponibleDaysEntity)
        private readonly disponibleDaysRepository: Repository<DisponibleDaysEntity>
    ) { }

    async create(body: DeepPartial<DisponibleDaysEntity>): Promise<DisponibleDaysEntity> {
        const disponibleDays = this.disponibleDaysRepository.create(body);
        return this.disponibleDaysRepository.save(disponibleDays);
    }
}