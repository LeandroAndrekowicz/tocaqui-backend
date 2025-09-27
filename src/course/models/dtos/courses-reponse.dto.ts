import { Expose, Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryResponseDto {
  @ApiProperty({ example: 1, description: 'ID da categoria.' })
  @Expose()
  id: number;

  @ApiProperty({ example: 'Programação', description: 'Nome da categoria.' })
  @Expose()
  name: string;

  @ApiProperty({ example: 'Cursos de desenvolvimento de software.', description: 'Descrição da categoria.' })
  @Expose()
  description: string;

  @ApiProperty({ example: 'https://meusite.com/logos/logo.png', description: 'URL do logo da categoria.' })
  @Expose()
  @Transform(({ value }) => `${process.env.BASE_URL}${value}`)
  logoUrl: string;
}

export class PersonResponseDto {
  @ApiProperty({ example: 15, description: 'ID da pessoa.' })
  @Expose()
  id: number;

  @ApiProperty({ example: 'João da Silva', description: 'Nome completo da pessoa.' })
  @Expose()
  name: string;

  @ApiProperty({ example: 'https://meusite.com/perfil/joao.png', description: 'URL da foto de perfil da pessoa.', nullable: true })
  @Expose()
  @Transform(({ value }) => value ? `${value}` : null)
  profilePicture: string | null;
}

export class DisponibleDaysResponseDto {
  @ApiProperty({ example: 'segunda', description: 'Dia da semana disponível.' })
  @Expose()
  day: string;
}

export class CourseResponseDto {
  @ApiProperty({ example: 101, description: 'ID do curso.' })
  @Expose()
  id: number;

  @ApiProperty({ example: 'Curso de React Avançado', description: 'Nome do curso.' })
  @Expose()
  name: string;

  @ApiProperty({ example: 'Aprenda React avançado com práticas de mercado.', description: 'Descrição detalhada do curso.' })
  @Expose()
  description: string;

  @ApiProperty({ example: '120.50', description: 'Preço da aula do curso.' })
  @Expose()
  lessonPrice: string;

  @ApiProperty({ example: 'https://meusite.com/thumbnails/react.png', description: 'URL da imagem de thumbnail do curso.' })
  @Expose()
  @Transform(({ value }) => `${process.env.BASE_URL}${value}`)
  thumbnailPicture: string;

  @ApiProperty({ type: () => CategoryResponseDto, description: 'Categoria do curso.' })
  @Type(() => CategoryResponseDto)
  @Expose()
  category: CategoryResponseDto;

  @ApiProperty({ type: () => PersonResponseDto, description: 'Informações do professor/instrutor.' })
  @Type(() => PersonResponseDto)
  @Expose()
  person: PersonResponseDto;

  @ApiProperty({ type: () => [DisponibleDaysResponseDto], description: 'Dias disponíveis do curso.' })
  @Type(() => DisponibleDaysResponseDto)
  @Expose()
  disponibleDays: DisponibleDaysResponseDto[];
}
