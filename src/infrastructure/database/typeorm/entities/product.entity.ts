import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 255})
    name: string;

    @Column({type: 'text'})
    description: string;

    @Column({type: 'decimal', precision: 10, scale: 2})
    price: number;

    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
    updatedAt: Date;
}