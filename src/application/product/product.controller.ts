import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductEntityDomain } from "src/domain/entities/product.entity";
import { ProductDto } from "src/shared/dtos/product.dto";

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createProduct(@Body() productDto: ProductDto): Promise<ProductEntityDomain> {
        return await this.productService.createProduct(productDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAllProducts(): Promise<ProductEntityDomain[]> {
        return await this.productService.getAllProducts();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getOneById(@Param('id') id: string): Promise<ProductEntityDomain> {
        return await this.productService.getOneProductById(id);
    }
 
    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    async updateProduct(
        @Param('id') id: string,
        @Body() updatedProduct: Partial<ProductEntityDomain>
    ): Promise<ProductEntityDomain> {
        return await this.productService.updateProduct(id, updatedProduct);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async deleteProduct(@Param('id') id: string): Promise<Boolean> {
        return await this.productService.DeleteProduct(id);
    }
}