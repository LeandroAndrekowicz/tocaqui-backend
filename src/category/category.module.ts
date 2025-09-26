import { Module, OnModuleInit } from "@nestjs/common";
import { SeedCategoriesUseCase } from "./use-cases/seed-categories/seed-categories.use-case";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryEntity } from "./models/entities/category.entity";
import { CategoriesRepository } from "./repositories/category.repository";
import { FindCategoriesController } from "./use-cases/find-categories/find-categories.controller";
import { FindCategoriesUseCase } from "./use-cases/find-categories/find-categories.use-case";
import { FindCategoryByIdUseCase } from "./use-cases/find-category-by-id/find-category-by-id.use-case";

@Module({
    imports: [
        TypeOrmModule.forFeature([CategoryEntity])
    ],
    controllers: [
        FindCategoriesController
    ],
    providers: [
        CategoriesRepository,
        SeedCategoriesUseCase,
        FindCategoriesUseCase,
        FindCategoryByIdUseCase
    ],
    exports: [
        FindCategoryByIdUseCase
    ],
})
export class CategoryModule implements OnModuleInit{
    constructor (
        private readonly seedCategoriesUseCase: SeedCategoriesUseCase
    ) {}

    async onModuleInit() {
        await this.seedCategoriesUseCase.execute();
    }
}