import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductEntity } from "src/domain/entities/product.entity";

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createProduct(@Body() product: ProductEntity): Promise<ProductEntity> {
        return await this.productService.createProduct(product);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAllProducts(): Promise<ProductEntity[]> {
        return await this.productService.getAllProducts();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getOneById(@Param('id', ParseIntPipe) id: number): Promise<ProductEntity> {
        return await this.productService.getOneProductById(id);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    async updateProduct(
        @Param('id', ParseIntPipe) id: number,
        @Body() updatedProduct: Partial<ProductEntity>
    ): Promise<ProductEntity> {
        return await this.productService.updateProduct(id, updatedProduct);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async deleteProduct(@Param('id', ParseIntPipe) id: number): Promise<Boolean> {
        return await this.productService.DeleteProduct(id);
    }
}