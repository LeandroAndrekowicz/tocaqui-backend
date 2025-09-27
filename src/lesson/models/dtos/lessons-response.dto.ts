import { Expose, Transform, Type } from 'class-transformer';

export class PersonResponseDto {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    email: string;

    @Expose()
    mobileNumber: string;

    @Expose()
    profilePicture: string;
}

export class CourseResponseDto {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    description: string;

    @Expose()
    lessonPrice: number;

    @Expose()
    thumbnailPicture: string;

    @Expose()
    days: string[];
}

export class LessonResponseDto {
    @Expose()
    id: number;

    @Expose()
    status: string;

    @Expose()
    @Type(() => PersonResponseDto)
    professor: PersonResponseDto;

    @Expose()
    @Type(() => PersonResponseDto)
    student: PersonResponseDto;

    @Expose()
    @Transform(({ obj }) => obj.courseLesson.map(cl => ({
        id: cl.course.id,
        name: cl.course.name,
        description: cl.course.description,
        lessonPrice: cl.course.lessonPrice,
        thumbnailPicture: cl.course.thumbnailPicture,
        days: cl.days.map(d => d.day)
    })))
    courses: CourseResponseDto;
}