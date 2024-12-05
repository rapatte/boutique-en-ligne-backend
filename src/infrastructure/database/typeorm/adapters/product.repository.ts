import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductRepositoryPort } from "src/domain/ports/product-repository.port";
import { Repository } from "typeorm";
import { ProductEntity } from "../entities/product.entity";
import { ProductMapper } from "src/shared/utils/mappers";
import { v4 as uuidv4 } from 'uuid';

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

    findOneByName(name: string): Promise<ProductEntity> {
        return this.repository.findOneBy({ name })
    }

    update(id: string, product: Partial<ProductEntity>): Promise<ProductEntity | null> {
        return this.repository.save({ id, ...product });
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.repository.delete(id)
        return result.affected > 0;
    }
}