import { ProductEntity } from "../entities/product.entity";

export interface ProductRepositoryPort {
    create(product: ProductEntity): Promise<ProductEntity>;
    findAll(): Promise<ProductEntity[] | null>;
    findOneById(id: number): Promise<ProductEntity | null>;
    update(id: number, product: Partial<ProductEntity>): Promise<ProductEntity | null>;
    delete(id: number): Promise<boolean>;
}