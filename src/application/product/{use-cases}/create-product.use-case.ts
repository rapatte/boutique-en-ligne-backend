import { BadRequestException, ConflictException, ForbiddenException, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { ProductEntityDomain } from "src/domain/entities/product.entity";
import { ProductRepositoryPort } from "src/domain/ports/product-repository.port";
import { ProductDto } from "src/shared/dtos/product.dto";
import { v4 } from "uuid";

@Injectable()
export class CreateProductUseCase {
    constructor(
        @Inject('ProductRepositoryPort')
        private readonly productRepository: ProductRepositoryPort
    ) { }

    async execute(productDto: ProductDto): Promise<ProductEntityDomain> {
        const product = new ProductEntityDomain(productDto)
        try {
            if (product.id == undefined) {
                product.id = v4();
            }
            const existingProduct = await this.productRepository.findOneById(product.id);
            if (existingProduct) {
                throw new ConflictException(`Un produit avec l'id ${product.id} existe déjà.`)
            }
            if (
                !productDto.price ||
                !productDto.description ||
                !productDto.name
            ) {
                throw new BadRequestException('Caractéristique(s) du produit manquante(s).')
            }
            if (typeof productDto.price !== 'number') {
                throw new ForbiddenException('Le prix doit être un nombre.')
            }

            return await this.productRepository.create(product);
        } catch (error) {
            if (
                error instanceof ConflictException ||
                error instanceof ForbiddenException ||
                error instanceof BadRequestException
            ) {
                throw error;
            }
            throw new InternalServerErrorException('Erreur serveur lors de la création du produit.')
        }
    }
}