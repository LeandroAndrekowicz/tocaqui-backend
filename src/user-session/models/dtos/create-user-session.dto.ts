import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserSessionDto {
    @IsNotEmpty({ message: "O token é obrigatório." })
    @IsString({ message: "O token deve ser uma string." })
    accessToken: string

    @IsNotEmpty({ message: "O refreshToken é obrigatório." })
    @IsString({ message: "O refreshToken deve ser uma string." })
    refreshToken: string;

    @IsNotEmpty({ message: "O personId é obrigatório." })
    @IsNumber({}, { message: "O personId deve ser um número." })
    personId: number;

    @IsNotEmpty({ message: "O ipAddress é obrigatório." })
    @IsString({ message: "O ipAddress deve ser uma string." })
    ipAddress: string;
}