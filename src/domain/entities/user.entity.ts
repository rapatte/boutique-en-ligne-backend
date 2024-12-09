export class UserEntityDomain {
    id?: string;
    lastname: string;
    firstname: string;
    email: string;
    password: string;
    country: string;
    city: string;
    postcode: string;
    street: string;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(partial: Partial<UserEntityDomain>) {
        Object.assign(this, partial);
    }
}