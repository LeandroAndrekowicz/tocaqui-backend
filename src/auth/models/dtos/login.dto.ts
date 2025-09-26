import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @IsNotEmpty({ message: "O CPF é obrigatório." })
    @IsString({ message: "O CPF deve ser uma string." })
    cpf: string;

    @IsNotEmpty({ message: "A senha é obrigatória." })
    @IsString({ message: "A senha deve ser uma string." })
    password: string;
}