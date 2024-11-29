import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { ProductRepositoryPort } from "src/domain/ports/product-repository.port";

@Injectable()
export class DeleteProductUseCase {
    constructor(private readonly productRepository: ProductRepositoryPort) {}

    async execute(id: number): Promise<boolean> {
        try {
            const product = await this.productRepository.findOneById(id);
            if (!product) {
                throw new NotFoundException(`Suppression impossible car le produit avec l'id ${id} est introuvable.`)
            }

            return await this.productRepository.delete(id);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Erreur serveur lors de la suppression du produit.');
        }
    }
}