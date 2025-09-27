import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DisponibleDaysEntity } from "./models/entities/disponible-days.entity";
import { CreateDisponibleDaysUseCase } from "./use-cases/create-disponible-days/create-disponible-days.use-case";
import { DisponibleDaysRepository } from "./repositories/disponible-days.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([DisponibleDaysEntity])
    ],
    controllers: [],
    providers: [
        DisponibleDaysRepository,
        CreateDisponibleDaysUseCase
    ],
    exports: [
        CreateDisponibleDaysUseCase
    ]
})
export class DisponibleDaysModule{}