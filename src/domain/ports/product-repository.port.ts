import { SearchProductDto } from "src/shared/dtos/product.dto";
import { ProductEntityDomain } from "../entities/product.entity";

export interface ProductRepositoryPort {
    create(product: ProductEntityDomain): Promise<ProductEntityDomain>;
    findAll(): Promise<ProductEntityDomain[] | null>;
    findOneById(id: string): Promise<ProductEntityDomain | null>;
    searchProducts(searchCriteria: SearchProductDto): Promise<ProductEntityDomain[]>;
    update(id: string, product: Partial<ProductEntityDomain>): Promise<ProductEntityDomain | null>;
    delete(id: string): Promise<boolean>;
}