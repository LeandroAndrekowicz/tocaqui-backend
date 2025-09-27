import { ArrayNotEmpty, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DisponibleDaysEnum } from 'src/common/enums/disponible-days.enum';

export class CreateLessonDto {
    @ApiProperty({
        description: 'ID do curso ao qual a aula pertence.',
        example: 101
    })
    @IsNotEmpty({ message: 'O Identificador do curso deve ser fornecido para criar uma aula.' })
    @IsNumber({}, { message: 'O Identificador do curso deve ser um número.' })
    courseId: number;

    @ApiProperty({
        description: 'ID do professor responsável pela aula.',
        example: 15
    })
    @IsNotEmpty({ message: 'O Identificador do professor deve ser fornecido para criar uma aula.' })
    @IsNumber({}, { message: 'O Identificador do professor deve ser um número.' })
    professorId: number;

    @ApiProperty({
        description: 'ID do estudante que participará da aula.',
        example: 27
    })
    @IsNotEmpty({ message: 'O Identificador do estudante deve ser fornecido para criar uma aula.' })
    @IsNumber({}, { message: 'O Identificador do estudante deve ser um número.' })
    studentId: number;

    @ApiProperty({
        description: 'Dias da semana selecionados para a aula.',
        enum: DisponibleDaysEnum,
        isArray: true,
        example: [DisponibleDaysEnum.FRIDAY, DisponibleDaysEnum.SATURDAY, DisponibleDaysEnum.TUESDAY]
    })
    @ArrayNotEmpty({ message: 'Deve ser fornecido ao menos um dia disponível da aula.' })
    @IsEnum(DisponibleDaysEnum, { message: 'Os dias disponíveis devem estar presentes no enum.', each: true })
    selectedDays: DisponibleDaysEnum[];
}
