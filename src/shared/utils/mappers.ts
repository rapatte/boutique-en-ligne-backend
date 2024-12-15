import { ProductEntityDomain } from 'src/domain/entities/product.entity';
import { UserEntityDomain } from 'src/domain/entities/user.entity';
import { ProductEntity } from 'src/infrastructure/database/typeorm/entities/product.entity';
import { UserEntity } from 'src/infrastructure/database/typeorm/entities/user.entity';

export class ProductMapper {
    static toDomain(product: ProductEntity): ProductEntityDomain {
        const productDomain = new ProductEntityDomain({
            id: product.id,
            name: product.name,
            price: product.price,
            description: product.description,
            category: product.category
        });
        return productDomain;
    }

    static toPersistence(product: ProductEntityDomain): ProductEntity {
        const productEntity = new ProductEntity();
        productEntity.id = product.id || undefined;
        productEntity.name = product.name;
        productEntity.price = product.price;
        productEntity.description = product.description;
        productEntity.category = product.category
        return productEntity;
    }
}

export class UserMapper {
    static toDomain(user: UserEntity): UserEntityDomain {
        const userDomain = new UserEntityDomain({
            id: user.id,
            lastname: user.lastname,
            firstname: user.firstname,
            country: user.country,
            street: user.street,
            postcode: user.postcode,
            city: user.city,
            email: user.email,
            password: user.password
        })
        return userDomain;
    }

    static toPersistencce(user: UserEntityDomain): UserEntity {
        const userEntity = new UserEntity();
        userEntity.id = user.id;
        userEntity.lastname = user.lastname;
        userEntity.firstname = user.firstname;
        userEntity.country = user.country;
        userEntity.street = user.street;
        userEntity.postcode = user.postcode;
        userEntity.email = user.email;
        userEntity.password = user.password;
        return userEntity;
    }
}