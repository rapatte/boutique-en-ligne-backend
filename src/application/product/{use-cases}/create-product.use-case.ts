import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { ProductEntity } from "src/domain/entities/product.entity";
import { ProductRepositoryPort } from "src/domain/ports/product-repository.port";

export class CreateProductUseCase {
    constructor(private readonly productRepository: ProductRepositoryPort) { }

    /*
    * Exécute le cas d'utilisation pour créer un produit.
    * @param product - Les données du produit à créer.
    * @returns Le produit créé.
    * @throws ConflictException si un produit avec le même ID existe déjà.
    * @throws InternalServerErrorException si une erreur imprévue se produit.
    */

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