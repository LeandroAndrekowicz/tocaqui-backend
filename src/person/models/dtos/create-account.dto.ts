import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length, Matches } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { AuthorityEnum } from "src/authority/models/enums/authority.enum";

export class CreatePersonWithCredentialDto {
  @ApiProperty({
    description: "Nome completo da pessoa.",
    example: "João da Silva",
    minLength: 2,
    maxLength: 100
  })
  @IsString({ message: "O nome deve ser um texto." })
  @IsNotEmpty({ message: "O nome é obrigatório." })
  @Length(2, 100, { message: "O nome deve ter entre 2 e 100 caracteres." })
  name: string;

  @ApiProperty({
    description: "E-mail da pessoa.",
    example: "joao@email.com",
    maxLength: 100
  })
  @IsEmail({}, { message: "O e-mail informado não é válido." })
  @IsNotEmpty({ message: "O e-mail é obrigatório." })
  @Length(5, 100, { message: "O e-mail deve ter no máximo 100 caracteres." })
  email: string;

  @ApiProperty({
    description: "Número de celular (apenas dígitos).",
    example: "11987654321",
    minLength: 10,
    maxLength: 15
  })
  @IsString({ message: "O número de celular deve ser um texto." })
  @IsNotEmpty({ message: "O número de celular é obrigatório." })
  @Length(10, 15, { message: "O número de celular deve ter entre 10 e 15 caracteres." })
  @Matches(/^\d+$/, { message: "O número de celular deve conter apenas dígitos." })
  mobileNumber: string;

  @ApiProperty({
    description: "CPF da pessoa (apenas números, 11 dígitos).",
    example: "12345678901",
    minLength: 11,
    maxLength: 11
  })
  @IsString({ message: "O CPF deve ser um texto." })
  @IsNotEmpty({ message: "O CPF é obrigatório." })
  @Length(11, 11, { message: "O CPF deve ter exatamente 11 dígitos." })
  @Matches(/^\d{11}$/, { message: "O CPF deve conter apenas números." })
  cpf: string;

  @ApiPropertyOptional({
    description: "URL ou caminho da foto de perfil.",
    example: "https://meusite.com/fotos/joao.png",
    maxLength: 255
  })
  @IsOptional()
  @IsString({ message: "A foto de perfil deve ser uma URL ou caminho válido." })
  @Length(1, 255, { message: "A foto de perfil deve ter no máximo 255 caracteres." })
  profilePicture?: string;

  @ApiProperty({
    description: "Senha de acesso (6 a 60 caracteres).",
    example: "senhaSegura123",
    minLength: 6,
    maxLength: 60
  })
  @IsString({ message: "A senha deve ser um texto." })
  @IsNotEmpty({ message: "A senha é obrigatória." })
  @Length(6, 60, { message: "A senha deve ter entre 6 e 60 caracteres." })
  password: string;

  @ApiProperty({
    description: "Autoridade/role da pessoa.",
    example: AuthorityEnum.ADMIN,
    enum: AuthorityEnum
  })
  @IsNotEmpty({ message: "A autoridade é obrigatória." })
  @IsEnum(AuthorityEnum, { message: "A autoridade informada é inválida." })
  authority: AuthorityEnum;
}
