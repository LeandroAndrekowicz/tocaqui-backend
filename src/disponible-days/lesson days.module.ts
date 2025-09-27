import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DisponibleDaysEntity } from "./models/entities/disponible-days.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([DisponibleDaysEntity])
    ],
    controllers: [],
    providers: [],
    exports: []
})
export class LessonDaysModule{}