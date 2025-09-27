import { Injectable } from "@nestjs/common";
import { DeepPartial, Repository } from "typeorm";
import { LessonEntity } from "../models/entities/lesson.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateLessonStatusDto } from "../models/dtos/update-lesson-status.dto";
import { FindLessonsQueryDto } from "../models/dtos/find-lessons-query.dto";
import { AuthorityEnum } from "src/authority/models/enums/authority.enum";

@Injectable()
export class LessonRepository {
    constructor(
        @InjectRepository(LessonEntity)
        private readonly lessonRepository: Repository<LessonEntity>
    ) { }

    async create(body: DeepPartial<LessonEntity>) {
        const newLesson = this.lessonRepository.create(body);
        return await this.lessonRepository.save(newLesson);
    }

    async findById(lessonId: number) {
        return await this.lessonRepository.findOne({
            where: {
                id: lessonId
            }
        })
    }

    async updateStatus(body: UpdateLessonStatusDto) {
        return await this.lessonRepository.update({
            id: body.lessonId
        }, {
            status: body.status
        })
    }

    async findByPersonId(query: FindLessonsQueryDto) {
        const { role, personId } = query;

        const lessons = await this.lessonRepository
            .createQueryBuilder("lesson")
            .leftJoinAndSelect("lesson.courseLesson", "courseLesson")
            .leftJoinAndSelect("courseLesson.course", "course")
            .leftJoinAndSelect("lesson.professor", "professor")
            .leftJoinAndSelect("lesson.student", "student")
            .leftJoinAndSelect("courseLesson.days", "days")
            .where(role === AuthorityEnum.STUDENT ? "student.id = :personId" : "professor.id = :personId", { personId })
            .getMany();

       return lessons;
    }
}