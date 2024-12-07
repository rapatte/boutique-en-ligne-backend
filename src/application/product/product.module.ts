import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "src/infrastructure/database/typeorm/entities/product.entity";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { ProductRepository } from "src/infrastructure/database/typeorm/adapters/product.repository";
import { CreateProductUseCase } from "./{use-cases}/create-product.use-case";
import { GetAllProductUseCase } from "./{use-cases}/getall-product.use-case";
import { GetOneProductById } from "./{use-cases}/getonebyid-product.use-case";
import { UpdateProductUseCase } from "./{use-cases}/update-product.use-case";
import { DeleteProductUseCase } from "./{use-cases}/delete-product.use-case";
import { SearchProductUseCase } from "./{use-cases}/search-product.use-case";

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity])],
    controllers: [ProductController],
    providers: [
        ProductService,
        {
            provide: 'ProductRepositoryPort', // Nom explicite pour le port
            useClass: ProductRepository, // Liaison avec l'implémentation concrète
        },
        CreateProductUseCase,
        GetAllProductUseCase,
        GetOneProductById,
        SearchProductUseCase,
        UpdateProductUseCase,
        DeleteProductUseCase,
    ],
    exports: [ProductService],
})

export class ProductModule {};