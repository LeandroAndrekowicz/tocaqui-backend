import { Body, Controller, Ip, Post } from "@nestjs/common";
import { LoginUseCase } from "./login.use-case";
import { LoginDto } from "src/auth/models/dtos/login.dto";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Login")
@Controller('auth')
export class LoginController {
    constructor(
        private readonly loginUseCase: LoginUseCase
    ) { }

    @Post('login')
    @ApiOperation({ summary: 'Realiza o login do usuário.' })
    @ApiBody({ type: LoginDto })
    async login(
        @Body() body: LoginDto,
        @Ip() ipAddress: string
    ) {
        return await this.loginUseCase.execute(body, ipAddress);
    }
}