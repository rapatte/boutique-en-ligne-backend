import { Product } from "../entities/product.entity";

export interface ProductRepositoryPort {
    create(product: Product): Promise<Product>;
    findAll(): Promise<Product[]>;
    findById(id: string): Promise<Product | null>;
  }
  