import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductRepositoryPort } from "src/domain/ports/product-repository.port";
import { Repository } from "typeorm";
import { ProductEntity } from "../entities/product.entity";
import { ProductMapper } from "src/shared/utils/mappers";
import { v4 as uuidv4 } from 'uuid';
import { SearchProductDto } from "src/shared/dtos/product.dto";

@Injectable()
export class ProductRepository implements ProductRepositoryPort {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly repository: Repository<ProductEntity>,
    ) { }

    async create(product: ProductEntity): Promise<ProductEntity> {
            product.id = uuidv4();
        const productEntity = ProductMapper.toPersistence(product);
        console.log('Product Entity before save:', productEntity);

        const savedEntity = await this.repository.save(productEntity);
        return ProductMapper.toDomain(savedEntity);
    }

    findAll(): Promise<ProductEntity[] | null> {
        return this.repository.find();
    }

    findOneById(id: string): Promise<ProductEntity | null> {
        return this.repository.findOneBy({ id });
    }

    async searchProducts(searchCriteria: SearchProductDto): Promise<ProductEntity[]> {
        const query = this.repository.createQueryBuilder('product')

        if (searchCriteria.name) {
            query.andWhere('product.name LIKE :name', {name: `%${searchCriteria.name}%`})
        }

        if (searchCriteria.category) {
            query.andWhere('product.category LIKE :category', {category: `%${searchCriteria.category}%`})
        }

        if (searchCriteria.minPrice) {
            query.andWhere('product.price >= :minPrice', {minPrice: `${searchCriteria.minPrice}`})
        }

        if (searchCriteria.maxPrice) {
            query.andWhere('product.price <= :maxPrice', {maxPrice: `${searchCriteria.maxPrice}`})
        }

        return await query.getMany();
    }

    update(id: string, product: Partial<ProductEntity>): Promise<ProductEntity | null> {
        return this.repository.save({ id, ...product });
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.repository.delete(id)
        return result.affected > 0;
    }
}