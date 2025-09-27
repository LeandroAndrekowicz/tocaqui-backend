import { ArrayNotEmpty, IsDecimal, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { DisponibleDaysEnum } from "src/common/enums/disponible-days.enum";

export class CreateCourseDto {
    @ApiProperty({
        description: "Nome do curso.",
        example: "Curso de React Avançado"
    })
    @IsNotEmpty({ message: 'O nome do curso é obrigatório' })
    @IsString({ message: 'O nome do curso deve ser uma string' })
    name: string;

    @ApiProperty({
        description: "Descrição detalhada do curso.",
        example: "Aprenda React avançado com práticas de mercado."
    })
    @IsNotEmpty({ message: 'A descrição do curso é obrigatória' })
    @IsString({ message: 'A descrição do curso deve ser uma string' })
    description: string;

    @ApiProperty({
        description: "Preço da aula do curso.",
        example: 120.50
    })
    @IsNotEmpty({ message: 'O preço do curso é obrigatório' })
    @IsDecimal({}, { message: 'O preço do curso deve ser um número decimal' })
    lessonPrice: number;

    @ApiProperty({
        description: "URL da thumbnail do curso.",
        example: "https://meusite.com/thumbnails/react.png"
    })
    @IsNotEmpty({ message: 'A thumbnail do curso é obrigatória' })
    @IsString({ message: 'A thumbnail do curso deve ser uma string' })
    thumbnail: string;

    @ApiProperty({
        description: "ID da categoria do curso.",
        example: 3
    })
    @IsNotEmpty({ message: 'A categoria do curso é obrigatória' })
    @IsNumber({}, { message: 'A categoria do curso deve ser um número' })
    categoryId: number;

    @ApiProperty({
        description: "ID do instrutor (professor) que criou o curso.",
        example: 15
    })
    @IsNotEmpty({ message: 'O ID do instrutor é obrigatório' })
    @IsNumber({}, { message: 'O ID do instrutor deve ser um número' })
    instructorId: number;

    @ApiProperty({
        description: "Dias da semana disponíveis para o curso.",
        enum: DisponibleDaysEnum,
        isArray: true,
        example: [DisponibleDaysEnum.FRIDAY, DisponibleDaysEnum.SATURDAY, DisponibleDaysEnum.TUESDAY]
    })
    @ArrayNotEmpty({ message: 'Deve ser fornecido ao menos um dia disponível do curso.' })
    @IsEnum(DisponibleDaysEnum, { message: 'Os dias disponíveis devem estar presentes no enum.', each: true })
    disponibleDays: DisponibleDaysEnum[];
}
