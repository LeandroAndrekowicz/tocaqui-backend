import { Expose, Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryResponseDto {
  @ApiProperty({ example: 5, description: 'ID da categoria.' })
  @Expose()
  id: number;

  @ApiProperty({ example: 'Cordas clássicas', description: 'Nome da categoria.' })
  @Expose()
  name: string;

  @ApiProperty({ example: 'Violinos, violas, violoncelos e contrabaixos.', description: 'Descrição da categoria.' })
  @Expose()
  description: string;

  @ApiProperty({ example: '/pictures/logos/violin.png', description: 'URL do logo da categoria.' })
  @Expose()
  @Transform(({ value }) => `${process.env.BASE_URL}${value}`)
  logoUrl: string;
}

export class ProfessorResponseDto {
  @ApiProperty({ example: 1, description: 'ID do professor.' })
  @Expose()
  id: number;

  @ApiProperty({ example: 'LEANDRO ANDREKOWICZ', description: 'Nome completo do professor.' })
  @Expose()
  name: string;

  @ApiProperty({ example: '42988316222', description: 'Telefone do professor.' })
  @Expose()
  mobileNumber: string;

  @ApiProperty({ example: 'https://i.pinimg.com/236x/ab/f1/d0/abf1d00cd069abe14363f2fbe68ee3e1.jpg', description: 'Foto de perfil do professor.' })
  @Expose()
  profilePicture: string;
}

export class DisponibleDaysResponseDto {
  @ApiProperty({ example: 4, description: 'ID do dia disponível.' })
  @Expose()
  id: number;

  @ApiProperty({ example: 'Sexta-feira', description: 'Dia da semana disponível.' })
  @Expose()
  day: string;
}

export class CourseResponseDto {
  @ApiProperty({ example: 2, description: 'ID do curso.' })
  @Expose()
  id: number;

  @ApiProperty({ example: 'dasdasdas', description: 'Nome do curso.' })
  @Expose()
  name: string;

  @ApiProperty({ example: 'Descrição do curso', description: 'Descrição detalhada do curso.' })
  @Expose()
  description: string;

  @ApiProperty({ example: '312.33', description: 'Preço da aula do curso.' })
  @Expose()
  lessonPrice: string;

  @ApiProperty({ example: '12313123123', description: 'Thumbnail do curso.' })
  @Expose()
  thumbnailPicture: string;

  @ApiProperty({ type: () => CategoryResponseDto, description: 'Categoria do curso.' })
  @Type(() => CategoryResponseDto)
  @Expose()
  category: CategoryResponseDto;

  @ApiProperty({ type: () => ProfessorResponseDto, description: 'Informações do professor.' })
  @Type(() => ProfessorResponseDto)
  @Expose()
  professor: ProfessorResponseDto;

  @ApiProperty({ type: () => [DisponibleDaysResponseDto], description: 'Dias disponíveis do curso.' })
  @Type(() => DisponibleDaysResponseDto)
  @Expose()
  disponibleDays: DisponibleDaysResponseDto[];
}
