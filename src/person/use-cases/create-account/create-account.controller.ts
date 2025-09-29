import { Body, Controller, Ip, Post } from "@nestjs/common";
import { CreateAccountUseCase } from "./create-account.use-case";
import { CreatePersonWithCredentialDto } from "src/person/models/dtos/create-account.dto";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Person")
@Controller('person')
export class CreateAccountController {
    constructor(
        private readonly createAccountUseCase: CreateAccountUseCase
    ) {}

    @Post('/create-account')
    @ApiOperation({ summary: 'Realiza o login do usuário.' })
    @ApiBody({ type: CreatePersonWithCredentialDto })
    async createAccount(
        @Ip() ipAddress: string,
        @Body() body: CreatePersonWithCredentialDto
    ) {
        return this.createAccountUseCase.execute(body, ipAddress);
    }
}