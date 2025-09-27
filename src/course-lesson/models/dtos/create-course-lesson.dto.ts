import { IsNotEmpty, IsEnum, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CourseEntity } from 'src/course/models/entities/course.entity';
import { LessonEntity } from 'src/lesson/models/entities/lesson.entity';
import { DisponibleDaysEnum } from 'src/common/enums/disponible-days.enum';

export class CreateCourseLessonDto {
    @ApiProperty({ type: () => CourseEntity, description: 'Curso ao qual a aula pertence.' })
    @IsNotEmpty({ message: 'O curso é obrigatório.' })
    @ValidateNested()
    @Type(() => CourseEntity)
    course: CourseEntity;

    @ApiProperty({ type: () => LessonEntity, description: 'Aula que será adicionada ao curso.' })
    @IsNotEmpty({ message: 'A aula é obrigatória.' })
    @ValidateNested()
    @Type(() => LessonEntity)
    lesson: LessonEntity;

    @ApiProperty({
        enum: DisponibleDaysEnum,
        isArray: true,
        description: 'Dias da semana disponíveis para esta aula no curso.',
        example: ['segunda', 'quarta', 'sexta']
    })
    @IsNotEmpty({ message: 'Os dias disponíveis são obrigatórios.' })
    @IsEnum(DisponibleDaysEnum, { each: true, message: 'Os dias disponíveis devem estar presentes no enum.' })
    days: DisponibleDaysEnum[];
}
