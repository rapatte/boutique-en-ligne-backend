import { ProductDto } from "src/shared/dtos/product.dto";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export class ProductEntity {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column({length: 255})
    name: string;

    @Column({type: 'text'})
    description: string;

    @Column({type: 'decimal', precision: 10, scale: 2})
    price: number;

    @CreateDateColumn({type: 'timestamp'})
    createdAt?: Date;

    @CreateDateColumn({type: 'timestamp'})
    updatedAt?: Date;

    static fromDto(dto: ProductDto): ProductEntity {
        const entity = new ProductEntity();
        entity.name = dto.name;
        entity.description = dto.description;
        entity.price = dto.price;
        return entity;
    }
}