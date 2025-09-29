import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { DisponibleDaysEnum } from "src/common/enums/disponible-days.enum";
import { CourseEntity } from "src/course/models/entities/course.entity";

export class CreateDisponibleDaysDto {
    @IsNotEmpty({ message: 'O Id do curso deve ser enviado.' })
    @IsNumber({}, { message: 'O Id do curso deve ser um número.' })
    course: CourseEntity;

    @IsNotEmpty({ message: 'Os dias disponíveis não podem ser nulos.' })
    @IsEnum(DisponibleDaysEnum, { message: 'Os dias disponíveis deve ser um presente no enum.' })
    days: DisponibleDaysEnum[]
}