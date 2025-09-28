import { Module } from "@nestjs/common";
import { SendEmailUseCase } from "./use-cases/send-email/send-email.use-case";

@Module({
    imports: [],
    controllers: [],
    providers: [
        SendEmailUseCase
    ],
    exports: [
        SendEmailUseCase
    ]
})
export class EmailModule {}