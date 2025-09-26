import { Body, Controller, Ip, Post } from "@nestjs/common";
import { LoginUseCase } from "./login.use-case";
import { LoginDto } from "src/auth/models/dtos/login.dto";

@Controller('auth')
export class LoginController {
    constructor (
        private readonly loginUseCase: LoginUseCase
    ) {}

    @Post('login')
    async login(
        @Body() body: LoginDto,
        @Ip() ipAddress: string
    ) {
        return await this.loginUseCase.execute(body, ipAddress);
    }
}