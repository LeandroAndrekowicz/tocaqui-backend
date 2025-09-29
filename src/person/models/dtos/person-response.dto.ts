import { Expose, Type, Transform } from 'class-transformer';
import { DisponibleDaysEnum } from 'src/common/enums/disponible-days.enum';

export class RoleResponseDto {
    @Expose() permission: string;
}

export class DisponibleDaysDto {
    @Expose() day: DisponibleDaysEnum;
}

export class CourseResponseDto {
    @Expose() id: string;
    @Expose() name: string;
    @Expose() description: string;
    @Expose() lessonPrice: number;
    @Expose() thumbnailPicture: string;

    @Expose()
    @Type(() => DisponibleDaysDto)
    @Transform(({ value }) => (Array.isArray(value) ? value : []))
    disponibleDays: DisponibleDaysDto[];
}

export class PersonResponseDto {
    @Expose() id: string;
    @Expose() name: string;
    @Expose() email: string;
    @Expose() mobileNumber: string;
    @Expose() profilePicture: string;

    @Expose()
    @Type(() => RoleResponseDto)
    @Transform(({ value }) => (Array.isArray(value) ? value[0] : []))
    authorities: RoleResponseDto;

    @Expose()
    @Type(() => CourseResponseDto)
    @Transform(({ value }) => (Array.isArray(value) ? value : []))
    courses: CourseResponseDto[];
}
