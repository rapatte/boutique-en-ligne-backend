import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { ProductEntityDomain } from "src/domain/entities/product.entity";
import { ProductRepositoryPort } from "src/domain/ports/product-repository.port";

@Injectable()
export class GetAllProductUseCase {
    constructor(
        @Inject('ProductRepositoryPort')
        private readonly productRepository: ProductRepositoryPort
    ) {}

    async execute(): Promise<ProductEntityDomain[]> {
        try {
            return this.productRepository.findAll();
        } catch (error) {
            throw new InternalServerErrorException('Erreur lors de la récupération des produits.')
        }
    }
}