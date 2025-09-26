import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { AuthorityEnum } from "../enums/authority.enum";

export class CreateAuthorityDto {
    @IsNotEmpty({ message: 'O campo authority não pode ser vazio' })
    @IsString({ message: 'O campo authority deve ser uma string' })
    @IsEnum(AuthorityEnum, { message: 'O campo authority deve ser um número' })
    authority: AuthorityEnum;

    @IsNotEmpty({ message: 'O campo personId não pode ser vazio' })
    @IsNumber({}, { message: 'O campo personId deve ser um número' })
    personId: number;
}