import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { MethodEnum } from "src/common/enums/method.enum";
import { handleUnexpectedError } from "src/common/functions/handle-unexpected-error.function";
import { CourseRepository } from "src/course/repositories/course.repository";

@Injectable()
export class FindCourseByIdUseCase {
    constructor (
        private readonly courseRepository: CourseRepository
    ) {}

    async execute(courseId: number) {
        try {
            if(!Number(courseId)) {
                throw new BadRequestException(`Identificador de curso ${courseId} inválido.`);
            }

            const course = await this.courseRepository.findById(courseId);            

            if(!course) {
                throw new NotFoundException(`Não possuem cursos cadastrados com o identificador ${courseId}.`);
            }

            return course;
        } catch (error) {
            handleUnexpectedError(error, FindCourseByIdUseCase.name, MethodEnum.GET, "Ocorreu um problema ao buscar o curso por id, por favor entre em contato com o suporte.");
        }
    }
}