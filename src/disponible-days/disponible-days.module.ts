import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DisponibleDaysEntity } from "./models/entities/disponible-days.entity";
import { CreateDisponibleDaysUseCase } from "./use-cases/create-disponible-days/create-disponible-days.use-case";
import { DisponibleDaysRepository } from "./repositories/disponible-days.repository";
import { FindDisponibleDaysController } from "./use-cases/find-disponible-days/find-disponible-days.controller";
import { FindDisponibleDaysUseCase } from "./use-cases/find-disponible-days/find-disponible-days.use-case";

@Module({
    imports: [
        TypeOrmModule.forFeature([DisponibleDaysEntity])
    ],
    controllers: [
        FindDisponibleDaysController
    ],
    providers: [
        DisponibleDaysRepository,
        CreateDisponibleDaysUseCase,
        FindDisponibleDaysUseCase
    ],
    exports: [
        CreateDisponibleDaysUseCase
    ]
})
export class DisponibleDaysModule{}