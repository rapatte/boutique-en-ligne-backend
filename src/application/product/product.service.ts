import { Injectable } from "@nestjs/common";
import { CreateProductUseCase } from "./{use-cases}/create-product.use-case";
import { GetAllProductUseCase } from "./{use-cases}/getall-product.use-case";
import { GetOneProductById } from "./{use-cases}/getonebyid-product.use-case";
import { UpdateProductUseCase } from "./{use-cases}/update-product.use-case";
import { DeleteProductUseCase } from "./{use-cases}/delete-product.use-case";
import { ProductEntityDomain } from "src/domain/entities/product.entity";

@Injectable()
export class ProductService {
    constructor(
        private readonly createProductUseCase: CreateProductUseCase,
        private readonly getallProductUseCase: GetAllProductUseCase,
        private readonly getOneProductByIdUseCase: GetOneProductById,
        private readonly updateProductUseCase: UpdateProductUseCase,
        private readonly deleteProductUseCase: DeleteProductUseCase,
    ) { }

    createProduct(product: ProductEntityDomain): Promise<ProductEntityDomain> {
        return this.createProductUseCase.execute(product);
    }

    getAllProducts(): Promise<ProductEntityDomain[]> {
        return this.getallProductUseCase.execute();
    }

    getOneProductById(id: string): Promise<ProductEntityDomain> {
        return this.getOneProductByIdUseCase.execute(id);
    }

    updateProduct(id: string, product: Partial<ProductEntityDomain>): Promise<ProductEntityDomain> {
        return this.updateProductUseCase.execute(id, product);
    }

    DeleteProduct(id: string): Promise<boolean> {
        return this.deleteProductUseCase.execute(id);
    }
}