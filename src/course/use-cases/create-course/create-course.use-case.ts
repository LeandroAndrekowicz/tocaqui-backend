import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthorityEnum } from "src/authority/models/enums/authority.enum";
import { FindCategoryByIdUseCase } from "src/category/use-cases/find-category-by-id/find-category-by-id.use-case";
import { MethodEnum } from "src/common/enums/method.enum";
import { handleUnexpectedError } from "src/common/functions/handle-unexpected-error.function";
import { CreateCourseDto } from "src/course/models/dtos/create-course.dto";
import { CourseEntity } from "src/course/models/entities/course.entity";
import { CourseRepository } from "src/course/repositories/course.repository";
import { FindPersonByIdUseCase } from "src/person/use-cases/find-person-by-id/find-person-by-id.use-case";
import { DeepPartial } from "typeorm";

@Injectable()
export class CreateCourseUseCase {
    constructor(
        private readonly courseRepository: CourseRepository,
        private readonly findCategoryByIdUseCase: FindCategoryByIdUseCase,
        private readonly findPersonByIdUseCase: FindPersonByIdUseCase
    ) { }

    async execute(body: CreateCourseDto) {
        try {
            const category = await this.findCategoryByIdUseCase.execute(body.categoryId);
            const person = await this.findPersonByIdUseCase.execute(body.instructorId);

            console.log(person);
            

            const hasPermission = person.authorities.some(authority => 
                authority.permission === AuthorityEnum.TEACHER || authority.permission === AuthorityEnum.ADMIN
            );

            if (!hasPermission) {
                throw new UnauthorizedException("Usuário sem permissão para criar um curso.");
            }

            const courseToCreate: DeepPartial<CourseEntity> = {
                category: category,
                person: person,
                name: body.name,
                description: body.description,
                lessonPrice: body.lessonPrice,
                thumbnailPicture: body.thumbnail
            }

            const course = await this.courseRepository.create(courseToCreate);

            return {
                message: "Curso criado com sucesso.",
                courseId: course.id
            };
        } catch (error) {
            handleUnexpectedError(error, CreateCourseUseCase.name, MethodEnum.CREATE, "Ocorreu um problema ao criar o curso, por favor entre em contato com o suporte.");
        }
    }
}