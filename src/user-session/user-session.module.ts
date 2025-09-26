import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserSessionEntity } from "./models/entities/user-session.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserSessionEntity])
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class UserSessionModule {}