
import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateProductUseCase } from '../../application/use-cases/create-product.use-case';
import { ProductRepositoryAdapter } from '../database/prisma/product-repository.adapter';
import { ListProductsUseCase } from 'src/application/use-cases/list-products.use-case';

@Controller('products')
export class ProductController {
  private readonly createProductUseCase: CreateProductUseCase;
  private readonly listProductsUseCase: ListProductsUseCase

  constructor(productRepository: ProductRepositoryAdapter) {
    this.createProductUseCase = new CreateProductUseCase(productRepository);
  }

  @Post()
  async create(@Body() body: { name: string; price: number; description: string }) {
    return this.createProductUseCase.execute(body);
  }

  @Get()
  async findAll() {
    return this.listProductsUseCase.execute();
  }
}
