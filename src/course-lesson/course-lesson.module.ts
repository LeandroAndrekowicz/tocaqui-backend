import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CourseLessonEntity } from "./models/entities/course-lesson.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([CourseLessonEntity])
    ],
    controllers: [],
    providers: [],
    exports: []
})
export class CourseLessonModule {}