import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DaysEntity } from "./models/entities/days.entity";
import { CreateDayUseCase } from "./use-cases/create-day/create-day.use-case";
import { DaysRepository } from "./repositories/days.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([DaysEntity])
    ],
    controllers: [],
    providers: [
        DaysRepository,
        CreateDayUseCase
    ],
    exports: [
        CreateDayUseCase
    ]
})
export class DaysModule {}