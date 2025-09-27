import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LessonEntity } from "./models/entities/lesson.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([LessonEntity])
    ],
    controllers: [],
    providers: [],
    exports: []
})
export class LessonModule {}