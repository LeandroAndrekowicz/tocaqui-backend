import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { MethodEnum } from "src/common/enums/method.enum";
import { handleUnexpectedError } from "src/common/functions/handle-unexpected-error.function";
import { LessonRepository } from "src/lesson/repositories/lesson.repository";

@Injectable()
export class FindLessonByIdUseCase {
    constructor (
        private readonly lessonRepository: LessonRepository
    ) {}

    async execute(lessonId: number) {
        try {
            if(!Number(lessonId)) {
                throw new BadRequestException(`Identificador de aula ${lessonId} inválido.`);
            }

            const lesson = await this.lessonRepository.findById(lessonId);

            if(!lesson) {
                throw new NotFoundException('Não possuem aulas cadastradas com o identificador solicitado.');
            }

            return lesson;
        } catch (error) {
            handleUnexpectedError(error, FindLessonByIdUseCase.name, MethodEnum.GET, "Ocorreu um problema ao buscar a aula por id, por favor entre em contato com o suporte.");
        }
    }
}