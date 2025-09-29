import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { FindPersonByIdUseCase } from "./find-person-by-id.use-case";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { PersonResponseDto } from "src/person/models/dtos/person-response.dto";

@ApiTags("Person")
@Controller("person")
export class FindPersonByIdController {
    constructor(
        private readonly findPersonByIdUseCase: FindPersonByIdUseCase
    ) { }

    @Get("/find-by/:personId")
    async find(
        @Param('personId') personId: string
    ) {
        const person = await this.findPersonByIdUseCase.execute(+personId);

        const plainPerson = instanceToPlain(person);

        return plainToInstance(PersonResponseDto, plainPerson, { excludeExtraneousValues: true });
    }
}