import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepositoryPort } from "src/domain/ports/user-repository.port";
import { Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";

@Injectable()
export class UserRepository implements UserRepositoryPort {
    constructor(
        @InjectRepository(UserEntity)
        private readonly repository: Repository<UserEntity>
    ) {}

    create(user: UserEntity): Promise<UserEntity> {
        return this.repository.save(user);
    }

    findAll(): Promise<UserEntity[] | null> {
        return this.repository.find();
    }

    findOneById(id: number): Promise<UserEntity | null> {
        return this.repository.findOneBy({id});
    }

    findOneByEmail(email: string): Promise<UserEntity | null> {
        return this.repository.findOneBy({email});
    }

    update(id: number, user: Partial<UserEntity>): Promise<UserEntity | null> {
        return this.repository.save({id, ...user});
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id)
        return result.affected > 0;
    }
}