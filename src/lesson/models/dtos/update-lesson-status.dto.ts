import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LessonStatusEnum } from 'src/lesson/models/enums/lesson-status.enum';

export class UpdateLessonStatusDto {
    @ApiProperty({
        description: 'ID da aula que terá o status atualizado.',
        example: 101
    })
    @IsNotEmpty({ message: 'O identificador da aula é obrigatório.' })
    @IsNumber({}, { message: 'O identificador da aula deve ser um número.' })
    lessonId: number;

    @ApiProperty({
        description: 'Novo status da aula.',
        enum: LessonStatusEnum,
        example: LessonStatusEnum.ACCEPTED
    })
    @IsNotEmpty({ message: 'O status da aula é obrigatório.' })
    @IsEnum(LessonStatusEnum, { message: 'O status informado é inválido.' })
    status: LessonStatusEnum;
}
