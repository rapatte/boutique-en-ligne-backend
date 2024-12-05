import { ProductEntityDomain } from 'src/domain/entities/product.entity';
import { ProductEntity } from 'src/infrastructure/database/typeorm/entities/product.entity';

export class ProductMapper {
    static toDomain(product: ProductEntity): ProductEntityDomain {
        const productDomain = new ProductEntityDomain({
            id: product.id,
            name: product.name,
            price: product.price,
            description: product.description,
        });
        return productDomain;
    }

    static toPersistence(product: ProductEntityDomain): ProductEntity {
        const productEntity = new ProductEntity();
        productEntity.id = product.id || undefined;
        productEntity.name = product.name;
        productEntity.price = product.price;
        productEntity.description = product.description;
        return productEntity;
    }
}
