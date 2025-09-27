import { Injectable, NotFoundException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { MethodEnum } from "src/common/enums/method.enum";
import { handleUnexpectedError } from "src/common/functions/handle-unexpected-error.function";
import { CourseResponseDto } from "src/course/models/dtos/courses-reponse.dto";
import { CourseRepository } from "src/course/repositories/course.repository";

@Injectable()
export class FindAllCoursesUseCase {
    constructor(
        private readonly courseRepository: CourseRepository
    ) { }

    async execute() {
        try {
            const courses = await this.courseRepository.findAll();

            if (!courses.length) {
                throw new NotFoundException("Não possuem cursos cadastrados.");
            }

            return {
                message: "Sucesso ao buscar cursos.",
                courses: plainToInstance(CourseResponseDto, courses, {
                    excludeExtraneousValues: true
                })
            }
        } catch (error) {
            handleUnexpectedError(error, FindAllCoursesUseCase.name, MethodEnum.GET, "Ocorreu um problema ao buscar os cursos, por favor entre em contato com o suporte.");
        }
    }
}