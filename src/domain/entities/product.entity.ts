export class ProductEntityDomain {
    id?: string;
    name: string;
    description: string;
    price: number;
    category: string;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(partial: Partial<ProductEntityDomain>) {
        Object.assign(this, partial);
    }
}