import { UserEntityDomain } from "../entities/user.entity";

export interface UserRepositoryPort {
    create(user: UserEntityDomain): Promise<UserEntityDomain>;
    findAll(): Promise<UserEntityDomain[] | null>;
    findOneById(id: string): Promise<UserEntityDomain | null>;
    findOneByEmail(email: string): Promise<UserEntityDomain | null>;
    update(id: string, user: Partial<UserEntityDomain>): Promise<UserEntityDomain | null>;
    delete(id: string): Promise<boolean>;
}