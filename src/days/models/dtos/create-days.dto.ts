import { IsNotEmpty, IsEnum, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { DisponibleDaysEnum } from 'src/common/enums/disponible-days.enum';
import { CourseLessonEntity } from 'src/course-lesson/models/entities/course-lesson.entity';

export class CreateDaysDto {
    @ApiProperty({ type: () => CourseLessonEntity, description: 'Associação com a aula do curso.' })
    @IsNotEmpty({ message: 'A aula do curso é obrigatória.' })
    @ValidateNested()
    @Type(() => CourseLessonEntity)
    courseLesson: CourseLessonEntity;

    @ApiProperty({
        enum: DisponibleDaysEnum,
        isArray: true,
        description: 'Dias da semana a serem adicionados para esta aula.',
        example: ['segunda', 'quarta', 'sexta']
    })
    @IsNotEmpty({ message: 'Os dias são obrigatórios.' })
    @IsEnum(DisponibleDaysEnum, { each: true, message: 'Os dias devem estar presentes no enum.' })
    days: DisponibleDaysEnum[];
}
