import { Expose, Transform, Type } from 'class-transformer';

export class CategoryResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  @Transform(({ value }) => `${process.env.BASE_URL}${value}`)
  logoUrl: string;
}

export class PersonResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  @Transform(({ value }) => value ? `${process.env.BASE_URL}${value}` : null)
  profilePicture: string | null;
}

export class CourseResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  lessonPrice: string;

  @Expose()
  @Transform(({ value }) => `${process.env.BASE_URL}${value}`)
  thumbnailPicture: string;

  @Type(() => CategoryResponseDto)
  @Expose()
  category: CategoryResponseDto;

  @Type(() => PersonResponseDto)
  @Expose()
  person: PersonResponseDto;
}
