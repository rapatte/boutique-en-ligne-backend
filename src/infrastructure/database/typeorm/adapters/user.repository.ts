import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/domain/entities/user.entity";
import { UserRepositoryPort } from "src/domain/ports/user-repository.port";
import { Repository } from "typeorm";

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