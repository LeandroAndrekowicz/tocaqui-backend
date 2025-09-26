import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class CreateCredentialDto {
  @IsNumber({}, { message: "O ID da pessoa deve ser um número." })
  @IsNotEmpty({ message: "O ID da pessoa é obrigatório." })
  personId: number;

  @IsString({ message: "A senha deve ser um texto." })
  @IsNotEmpty({ message: "A senha é obrigatória." })
  @Length(6, 60, { message: "A senha deve ter entre 6 e 60 caracteres." })
  password: string;
}
