import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { UserEntity } from "src/domain/entities/user.entity";
import { UserRepositoryPort } from "src/domain/ports/user-repository.port";

@Injectable()
export class CreateUserUseCase {
    constructor(private readonly userRepository: UserRepositoryPort) {}

    async execute(user: UserEntity): Promise<UserEntity> {
        try {
            const existingUser = await this.userRepository.findOneByEmail(user.email);
            if (existingUser) {
                throw new ConflictException(`Un utilisateur avec l'email ${user.email} existe déjà.`)
            }

            return await this.userRepository.create(user);
        } catch (error) {
            if (error instanceof ConflictException) {
                throw error;
            }
            throw new InternalServerErrorException("Erreur serveur lors de la création de l'utilisateur");
        }
    }
}