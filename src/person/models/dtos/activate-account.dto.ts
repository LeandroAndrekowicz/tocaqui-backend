import { IsNotEmpty, IsString } from "class-validator";

export class ActivateAccountDto {
    @IsNotEmpty({ message: "O CPF é obrigatório." })
    @IsString({ message: "O CPF deve ser um texto." })
    cpf: string;

    @IsNotEmpty({ message: "O código é obrigatório." })
    @IsString({ message: "O código deve ser um texto." })
    code: string;
}