import { Body, Controller, Post } from "@nestjs/common";
import { ActivateAccountUseCase } from "./activate-account.use-case";
import { ActivateAccountDto } from "src/person/models/dtos/activate-account.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Person")
@Controller('person')
export class ActivateAccountController {
    constructor (
        private readonly activateAccountUseCase: ActivateAccountUseCase
    ) {}

    @Post('activate-account')
    @ApiOperation({ summary: 'Ativar conta do usuario.' })
    async activateAccount(
        @Body() body: ActivateAccountDto
    ) {
        return this.activateAccountUseCase.execute(body);
    }
}