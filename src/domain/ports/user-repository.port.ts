import { UserEntity } from "../entities/user.entity";

export interface UserRepositoryPort {
    create(user: UserEntity): Promise<UserEntity>;
    findAll(): Promise<UserEntity[] | null>;
    findOneById(id: string): Promise<UserEntity | null>;
    findOneByEmail(email: string): Promise<UserEntity | null>;
    update(id: string, user: Partial<UserEntity>): Promise<UserEntity | null>;
    delete(id: string): Promise<boolean>;
}