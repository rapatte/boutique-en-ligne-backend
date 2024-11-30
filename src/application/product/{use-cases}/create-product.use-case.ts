import { ConflictException, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { ProductEntity } from "src/domain/entities/product.entity";
import { ProductRepositoryPort } from "src/domain/ports/product-repository.port";

@Injectable()
export class CreateProductUseCase {
    constructor(
        @Inject('ProductRepositoryPort')
        private readonly productRepository: ProductRepositoryPort
    ) { }

    async execute(product: ProductEntity): Promise<ProductEntity> {
        try {
            const existingProduct = await this.productRepository.findOneById(product.id);
            if (existingProduct) {
                throw new ConflictException('Un produit avec cet id existe déjà.')
            }

            const createdProduct = await this.productRepository.create(product);
            return createdProduct;
        } catch (error) {
            if (error instanceof ConflictException) {
                throw error; // Si erreur connue
            }
            throw new InternalServerErrorException('Erreur lors de la création du produit.')
        }
    }
}