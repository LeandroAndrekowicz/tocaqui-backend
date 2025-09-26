import { IsDecimal, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCourseDto {
    @IsNotEmpty({ message: 'O nome do curso é obrigatório' })
    @IsString({ message: 'O nome do curso deve ser uma string' })
    name: string;

    @IsNotEmpty({ message: 'A descrição do curso é obrigatória' })
    @IsString({ message: 'A descrição do curso deve ser uma string' })
    description: string;

    @IsNotEmpty({ message: 'O preço do curso é obrigatório' })
    @IsDecimal({}, { message: 'O preço do curso deve ser um número decimal' })
    lessonPrice: number;

    @IsNotEmpty({ message: 'A thumbnail do curso é obrigatória' })
    @IsString({ message: 'A thumbnail do curso deve ser uma string' })
    thumbnail: string;

    @IsNotEmpty({ message: 'A categoria do curso é obrigatória' })
    @IsNumber({}, { message: 'A categoria do curso deve ser um número' })
    categoryId: number;

    @IsNotEmpty({ message: 'O ID do instrutor é obrigatório' })
    @IsNumber({}, { message: 'O ID do instrutor deve ser um número' })
    instructorId: number;
}