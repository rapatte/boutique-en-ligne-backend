import { ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { ProductEntityDomain } from "src/domain/entities/product.entity";
import { ProductRepositoryPort } from "src/domain/ports/product-repository.port";

@Injectable()
export class UpdateProductUseCase {
    constructor(
        @Inject('ProductRepositoryPort')
        private readonly productRepository: ProductRepositoryPort
    ) {}

    async execute(id: string, updatedProduct: Partial<ProductEntityDomain>): Promise<ProductEntityDomain> {
        try {
            const existingProduct = await this.productRepository.findOneById(id);
            if (!existingProduct) {
                throw new NotFoundException(`Le produit avec l'id ${id} est introuvable.`)
            }

            if (updatedProduct.name && updatedProduct.name !== existingProduct.name) {
                const productWithSameName = await this.productRepository.searchProducts(updatedProduct)
                if (productWithSameName) {
                    throw new ConflictException('Un produit du même nom existe déjà.')
                }
            }

            return await this.productRepository.update(id, updatedProduct);
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof ConflictException) {
                throw error;
            }
            throw new InternalServerErrorException('Une erreur serveur est survenue lors de la modification du produit.')
        }
    }
}