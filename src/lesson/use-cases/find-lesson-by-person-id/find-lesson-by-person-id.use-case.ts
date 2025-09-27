import { Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { MethodEnum } from "src/common/enums/method.enum";
import { handleUnexpectedError } from "src/common/functions/handle-unexpected-error.function";
import { FindLessonsQueryDto } from "src/lesson/models/dtos/find-lessons-query.dto";
import { LessonResponseDto } from "src/lesson/models/dtos/lessons-response.dto";
import { LessonRepository } from "src/lesson/repositories/lesson.repository";
import { FindPersonByIdUseCase } from "src/person/use-cases/find-person-by-id/find-person-by-id.use-case";

type GroupedLesson = {
    id: number;
    status: string;
    professor: {
        id: number;
        name: string;
        email: string;
        mobileNumber: string;
        profilePicture: string;
    } | null;
    students: {
        id: number;
        name: string;
        email: string;
        mobileNumber: string;
        profilePicture: string;
    }[];
    courses: {
        id: number;
        name: string;
        description: string;
        lessonPrice: string | number;
        thumbnailPicture: string;
        days: string[];
    }[];
};


@Injectable()
export class FindLessonByPersonIdUseCase {
    constructor(
        private readonly lessonRepository: LessonRepository,
        private readonly findPersonByIdUseCase: FindPersonByIdUseCase
    ) { }

    async execute(query: FindLessonsQueryDto) {
        try {
            await this.findPersonByIdUseCase.execute(query.personId);

            const lessons = await this.lessonRepository.findByPersonId(query);

            return {
                message: "Sucesso ao buscar aulas",
                lessons: plainToInstance(LessonResponseDto, lessons, {
                    excludeExtraneousValues: true,
                })
            };
        } catch (error) {
            handleUnexpectedError(
                error,
                FindLessonByPersonIdUseCase.name,
                MethodEnum.GET,
                "Ocorreu um problema ao buscar a aula por id do usuario, por favor entre em contato com o suporte."
            );
        }
    }
}
