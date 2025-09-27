import { IsEnum, IsInt, IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { AuthorityEnum } from "src/authority/models/enums/authority.enum";

export class FindLessonsQueryDto {
    @ApiProperty({
        example: 42,
        description: "ID do usuário que está buscando as aulas",
        type: Number,
    })
    @IsInt({ message: "O ID do usuário deve ser um número inteiro." })
    @Type(() => Number)
    @IsNotEmpty({ message: "O ID do usuário é obrigatório." })
    personId: number;

    @ApiProperty({
        example: AuthorityEnum.STUDENT,
        description: "Define o papel do usuário na busca (STUDENT ou PROFESSOR)",
        enum: AuthorityEnum,
    })
    @IsEnum(AuthorityEnum, {
        message: "O papel deve ser STUDENT ou PROFESSOR.",
    })
    @IsNotEmpty({ message: "O papel é obrigatório." })
    role: AuthorityEnum;
}
