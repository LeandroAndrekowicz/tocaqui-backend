import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { MethodEnum } from "src/common/enums/method.enum";
import { handleUnexpectedError } from "src/common/functions/handle-unexpected-error.function";
import { CourseResponseDto } from "src/course/models/dtos/courses-reponse.dto";
import { CourseRepository } from "src/course/repositories/course.repository";

@Injectable()
export class FindCourseByCategoriesUseCase {
    constructor(
        private readonly courseRepository: CourseRepository
    ) { }

    async execute(categories: string) {
        try {
            const parsedCategories: number[] = this.validateCategories(categories);

            const courses = await this.courseRepository.findByCategories(parsedCategories);

            if (!courses.length) {
                throw new NotFoundException("Não possuem cursos cadastrados nas categorias solicitadas.");
            }

            return {
                message: "Sucesso ao buscar cursos.",
                courses: plainToInstance(CourseResponseDto, courses, {
                    excludeExtraneousValues: true
                })
            }
        } catch (error) {
            handleUnexpectedError(error, FindCourseByCategoriesUseCase.name, MethodEnum.GET, "Ocorreu um problema ao buscar curso por categorias, por favor entre em contato com o suporte.");
        }
    }

    private validateCategories(categories: string): number[] {
        let parsedCategories: number[];

        try {
            parsedCategories = JSON.parse(categories);
        } catch {
            throw new BadRequestException('Formato inválido, use: [1,2,3]');
        }

        if (
            !Array.isArray(parsedCategories) ||
            !parsedCategories.every(n => Number.isInteger(n))
        ) {
            throw new BadRequestException('O parâmetro deve ser um array de números, ex: [1,2,3]');
        }

        return parsedCategories;
    }
}