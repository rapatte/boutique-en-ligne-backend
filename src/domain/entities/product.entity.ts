export class ProductEntityDomain {
    id?: string;
    name: string;
    description: string;
    price: number;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(partial: Partial<ProductEntityDomain>) {
        Object.assign(this, partial);
    }
}