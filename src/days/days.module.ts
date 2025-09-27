import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DaysEntity } from "./models/entities/days.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([DaysEntity])
    ],
    controllers: [],
    providers: [],
    exports: []
})
export class DaysModule {}