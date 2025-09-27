import { BadRequestException, Injectable } from "@nestjs/common";
import { MethodEnum } from "src/common/enums/method.enum";
import { handleUnexpectedError } from "src/common/functions/handle-unexpected-error.function";
import { CreateCourseLessonDto } from "src/course-lesson/models/dtos/create-course-lesson.dto";
import { CreateCourseLessonUseCase } from "src/course-lesson/use-cases/create-course-lesson/create-course-lesson.use-case";
import { FindCourseByIdUseCase } from "src/course/use-cases/find-course-by-id/find-course-by-id.use-case";
import { CreateLessonDto } from "src/lesson/models/dtos/create-lesson.dto";
import { LessonEntity } from "src/lesson/models/entities/lesson.entity";
import { LessonStatusEnum } from "src/lesson/models/enums/lesson-status.enum";
import { LessonRepository } from "src/lesson/repositories/lesson.repository";
import { FindPersonByIdUseCase } from "src/person/use-cases/find-person-by-id/find-person-by-id.use-case";
import { DeepPartial } from "typeorm";

@Injectable()
export class CreateLessonUseCase {
    constructor(
        private readonly lessonRepository: LessonRepository,
        private readonly findPersonByIdUseCase: FindPersonByIdUseCase,
        private readonly findCourseByIdUseCase: FindCourseByIdUseCase,
        private readonly createCourseLessonUseCase: CreateCourseLessonUseCase,
    ) { }

    async execute(body: CreateLessonDto) {
        try {
            const professor = await this.findPersonByIdUseCase.execute(body.professorId);
            const student = await this.findPersonByIdUseCase.execute(body.studentId);
            const course = await this.findCourseByIdUseCase.execute(body.courseId);

            if(professor.id === student.id) {
                throw new BadRequestException('Não é permitido que a mesma pessoa seja professor e aluno na mesma aula.');
            }

            const newLesson: DeepPartial<LessonEntity> = {
                professor: professor,
                student: student,
                status: LessonStatusEnum.PENDING,
            }

            const lesson = await this.lessonRepository.create(newLesson);

            const courseLessonToCreate: CreateCourseLessonDto = {
                course: course,
                lesson: lesson,
                days: body.selectedDays
            }

            await this.createCourseLessonUseCase.execute(courseLessonToCreate);

            return {
                message: 'Aula criada com sucesso.',
                lessonId: lesson.id
            }
        } catch (error) {
            handleUnexpectedError(error, CreateLessonUseCase.name, MethodEnum.CREATE, "Ocorreu um problema ao criar aula, por favor entre em contato com o suporte.");
        }
    }
}