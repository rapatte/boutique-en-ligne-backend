import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { ProductEntityDomain } from "src/domain/entities/product.entity";
import { ProductRepositoryPort } from "src/domain/ports/product-repository.port";
import { SearchProductDto } from "src/shared/dtos/product.dto";

@Injectable()
export class SearchProductUseCase {
    constructor(
        @Inject('ProductRepositoryPort')
        private readonly productRepository: ProductRepositoryPort
    ) { }

    async execute(searchCriteria: SearchProductDto): Promise<ProductEntityDomain[]> {
        try {
            if (
                !searchCriteria.category &&
                !searchCriteria.maxPrice &&
                !searchCriteria.minPrice &&
                !searchCriteria.name
            ) {
                throw new BadRequestException('La barre de recherche doit contenir')
            }
            return this.productRepository.searchProducts(searchCriteria)
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error
            }
            throw new InternalServerErrorException('Erreur serveur lors de la recherche.')
        }
    }
}