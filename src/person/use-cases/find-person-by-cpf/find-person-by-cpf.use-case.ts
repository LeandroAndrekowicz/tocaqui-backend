import { ConflictException, Injectable } from "@nestjs/common";
import { PersonRepository } from "src/person/repositories/person.repository";

@Injectable()
export class FindPersonByCpfUseCase {
    constructor (
        private readonly personRepository: PersonRepository
    ) {}
    
    async execute(cpf: string) {
        const person = await this.personRepository.findByCpf(cpf);

        if(person.length) {
            throw new ConflictException("Já existe uma conta vinculada a esse CPF.");
        }

        else return true;
    }
}