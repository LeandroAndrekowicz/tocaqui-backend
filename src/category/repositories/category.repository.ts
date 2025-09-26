import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from "../models/entities/category.entity";
import { Repository } from "typeorm";
import { CategoryType } from "../models/types/categories.type";

@Injectable()
export class CategoriesRepository {
    constructor (
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>
    ) {}

    async count(): Promise<number> {
        return this.categoryRepository.count();
    }

    async seed(categories: CategoryType[]) {
        const sql = `
            INSERT INTO category (name, description, logo_url, is_active) VALUES
            ${categories
            .map(
                category =>
                `('${category.name.replace("'", "''")}', '${category.description.replace("'", "''")}', '${category.logoUrl}', ${category.isActive})`
            )
            .join(',\n')};
        `;

        return await this.categoryRepository.query(sql);
    }

    async findAll() {
        return this.categoryRepository.find({
            where: {
                isActive: true
            }
        });
    }
}