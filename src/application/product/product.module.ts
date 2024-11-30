import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "src/infrastructure/database/typeorm/entities/product.entity";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { ProductRepository } from "src/infrastructure/database/typeorm/adapters/product.repository";

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity])],
    controllers: [ProductController],
    providers: [ProductService, ProductRepository],
    exports: [ProductService],
})

export class ProductModule {};