import { Injectable } from "@nestjs/common";
import { MethodEnum } from "src/common/enums/method.enum";
import { handleUnexpectedError } from "src/common/functions/handle-unexpected-error.function";
import { CreateCourseLessonDto } from "src/course-lesson/models/dtos/create-course-lesson.dto";
import { CourseLessonEntity } from "src/course-lesson/models/entities/course-lesson.entity";
import { CourseLessonRepository } from "src/course-lesson/repositories/course-lesson.repository";
import { CreateDaysDto } from "src/days/models/dtos/create-days.dto";
import { CreateDayUseCase } from "src/days/use-cases/create-day/create-day.use-case";
import { DeepPartial } from "typeorm";

@Injectable()
export class CreateCourseLessonUseCase {
    constructor (
        private readonly courseLessonRepository: CourseLessonRepository,
        private readonly createDayUseCase: CreateDayUseCase
    ) {}

    async execute(body: CreateCourseLessonDto) {
        try {
            const courseLessonToCreate: DeepPartial<CourseLessonEntity> = {
                course: body.course,
                lesson: body.lesson
            }

            const courseLesson = await this.courseLessonRepository.create(courseLessonToCreate);

            const daysToCreate: CreateDaysDto = {
                courseLesson: courseLesson,
                days: body.days
            }

            await this.createDayUseCase.execute(daysToCreate);
            
            return {
                message: "Aula vinculada com sucesso."
            }
        } catch (error) {
            handleUnexpectedError(error, CreateCourseLessonUseCase.name, MethodEnum.CREATE, "Ocorreu um problema vincular a aula com o curso, por favor entre em contato com o suporte.");
        }
    }
}