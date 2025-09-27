import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CategoriesRepository } from "src/category/repositories/category.repository";
import { MethodEnum } from "src/common/enums/method.enum";
import { handleUnexpectedError } from "src/common/functions/handle-unexpected-error.function";

@Injectable()
export class FindCategoryByIdUseCase {
    constructor(
        private readonly categoryRepository: CategoriesRepository
    ) { }

    async execute(categoryId: number) {
        try {
            if(!Number(categoryId)) {
                throw new BadRequestException(`Idenficador de curso ${categoryId} inválido.`);
            }

            const category = await this.categoryRepository.findById(categoryId);

            if (!category) {
                throw new NotFoundException("Categoria solicitada não foi encontrada");
            }

            return category;
        } catch (error) {
            handleUnexpectedError(error, FindCategoryByIdUseCase.name, MethodEnum.GET, "Ocorreu um problema ao buscar a categoria do curso, por favor entre em contato com o suporte.")
        }
    }
}