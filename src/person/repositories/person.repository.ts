import { Injectable } from "@nestjs/common";
import { DeepPartial, Repository } from "typeorm";
import { PersonEntity } from "../models/entities/person.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreatePersonWithCredentialDto } from "../models/dtos/create-account.dto";

@Injectable()
export class PersonRepository {
    constructor(
        @InjectRepository(PersonEntity)
        private readonly repository: Repository<PersonEntity>
    ) {}

    async createAccount(body: DeepPartial<PersonEntity>): Promise<PersonEntity> {
        const person = this.repository.create(body);

        return this.repository.save(person);
    }

    async findByCpf(cpf: string): Promise<PersonEntity[]>{
        return await this.repository.find({
            where: {
                cpf
            }
        });
    }
}