import { Injectable, NotFoundException } from "@nestjs/common";
import { CategoriesRepository } from "src/category/repositories/category.repository";
import { MethodEnum } from "src/common/enums/method.enum";
import { handleUnexpectedError } from "src/common/functions/handle-unexpected-error.function";

@Injectable()
export class FindCategoriesUseCase {
    constructor (
        private readonly categoriesRepository: CategoriesRepository
    ) {}

    async execute() {
        try {
            const categories = await this.categoriesRepository.findAll();

            if(!categories.length) {
                throw new NotFoundException("Nenhuma categoria encontrada");
            }

            return categories.map(category => {
                const {logoUrl, createdAt, updatedAt, isActive, ...rest} = category;

                return {
                    ...rest,
                    logoUrl: logoUrl ? `${process.env.BASE_URL}${logoUrl}` : null
                }
            })
        } catch (error) {
            handleUnexpectedError(error, FindCategoriesUseCase.name, MethodEnum.GET, "Ocorreu um problema ao buscar as categorias, por favor entre em contato com o suporte");
        }
    }
}