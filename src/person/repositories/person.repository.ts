import { Injectable } from "@nestjs/common";
import { DeepPartial, Repository } from "typeorm";
import { PersonEntity } from "../models/entities/person.entity";
import { InjectRepository } from "@nestjs/typeorm";

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
            },
            relations: {
                credentials: true,
                userSessions: true,
                authorities: true
            }
        });
    }

    async activatePerson(personId: number): Promise<void> {
        await this.repository.update({
            id: personId
        }, {
            isActive: true
        });
    }

    async findById(personId: number): Promise<PersonEntity | null> {
        return await this.repository.findOne({
            where: {
                id: personId
            },
            relations: {
                credentials: true,
                userSessions: true,
                authorities: true,
                courses: true
            }
        });
    }
}