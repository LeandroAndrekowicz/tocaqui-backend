import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({
    example: "12345678900",
    description: "CPF do usuário no formato apenas números."
  })
  @IsNotEmpty({ message: "O CPF é obrigatório." })
  @IsString({ message: "O CPF deve ser uma string." })
  cpf: string;

  @ApiProperty({
    example: "minhaSenhaSecreta",
    description: "Senha de acesso do usuário."
  })
  @IsNotEmpty({ message: "A senha é obrigatória." })
  @IsString({ message: "A senha deve ser uma string." })
  password: string;
}
