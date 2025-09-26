import { Body, Controller, Post } from "@nestjs/common";
import { CreateAccountUseCase } from "./create-account.use-case";
import { CreatePersonWithCredentialDto } from "src/person/models/dtos/create-account.dto";

@Controller('person')
export class CreateAccountController {
    constructor(
        private readonly createAccountUseCase: CreateAccountUseCase
    ) {}

    @Post('/create-account')
    async createAccount(
        @Body() body: CreatePersonWithCredentialDto
    ) {
        return this.createAccountUseCase.execute(body);
    }
}