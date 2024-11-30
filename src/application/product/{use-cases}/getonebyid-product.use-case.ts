import { Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { ProductEntity } from "src/domain/entities/product.entity";
import { ProductRepositoryPort } from "src/domain/ports/product-repository.port";

@Injectable()
export class GetOneProductById {
    constructor(
        @Inject('ProductRepositoryPort')
        private readonly productRepository: ProductRepositoryPort
    ) {}

    async execute(id: number): Promise<ProductEntity> {
        try {
            const product = await this.productRepository.findOneById(id);
            if (!product) {
                throw new NotFoundException(`Le produit avec l'id ${id} est introuvable.`)
            }

            return this.productRepository.findOneById(id);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Erreur serveur lors de la récuparation du produit.')
        }
    }
}