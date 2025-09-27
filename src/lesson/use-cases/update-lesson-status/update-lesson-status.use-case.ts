import { Injectable } from "@nestjs/common";
import { errorMonitor } from "events";
import { MethodEnum } from "src/common/enums/method.enum";
import { handleUnexpectedError } from "src/common/functions/handle-unexpected-error.function";
import { UpdateLessonStatusDto } from "src/lesson/models/dtos/update-lesson-status.dto";
import { LessonRepository } from "src/lesson/repositories/lesson.repository";
import { FindLessonByIdUseCase } from "../find-lesson-by-id/find-lesson-by-id.use-case";

@Injectable()
export class UpdateLessonStatusUseCase {
    constructor (
        private readonly lessonRepository: LessonRepository,
        private readonly findLessonByIdUseCase: FindLessonByIdUseCase
    ) {}

    async execute(body: UpdateLessonStatusDto) {
        try {
            await this.findLessonByIdUseCase.execute(body.lessonId);

            await this.lessonRepository.updateStatus(body);

            return {
                message: "Status atualizado com sucesso."
            }
        } catch (error) {
            handleUnexpectedError(error, UpdateLessonStatusUseCase.name, MethodEnum.UPDATE, "Ocorreu um problema ao atualizar o status da aula, por favor entre em contato com o suporte.");
        }
    }
}