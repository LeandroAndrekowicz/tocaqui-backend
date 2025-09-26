import { Injectable, Logger } from "@nestjs/common";
import { categoriesJson } from "src/category/models/json/categories.json";
import { CategoriesRepository } from "src/category/repositories/category.repository";

@Injectable()
export class SeedCategoriesUseCase {
    constructor (
        private readonly categoriesRepository: CategoriesRepository
    ) {}

    private logger: Logger = new Logger(SeedCategoriesUseCase.name);

    async execute(): Promise<void> {
        try {
            this.logger.debug("Populando categorias iniciais");

            const countCategories = await this.categoriesRepository.count();

            if (countCategories === 0) {
                await this.categoriesRepository.seed(categoriesJson);
                this.logger.debug("Categorias iniciais populadas com sucesso");
            } else {
                this.logger.debug("Categorias já foram populadas anteriormente");
            }

        } catch (error) {
            this.logger.error("Ocorreu um problema ao tentar popular as categorias iniciais", error);
        }
    }
}