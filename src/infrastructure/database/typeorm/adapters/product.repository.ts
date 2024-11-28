import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "src/domain/entities/product.entity";
import { ProductRepositoryPort } from "src/domain/ports/product-repository.port";
import { Repository } from "typeorm";

@Injectable()
export class ProductRepository implements ProductRepositoryPort {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly repository: Repository<ProductEntity>,
    ) {}

    create(product: ProductEntity): Promise<ProductEntity> {
        return this.repository.save(product);
    }

    findAll(): Promise<ProductEntity[] | null> {
        return this.repository.find();
    }

    findOneById(id: number): Promise<ProductEntity | null> {
        return this.repository.findOneBy({id});
    }

    update(id: number, product: Partial<ProductEntity>): Promise<ProductEntity | null> {
        return this.repository.save({id, ...product});
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id)
        return result.affected > 0;
    }
}