import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { UserEntity } from "src/domain/entities/user.entity";
import { UserRepositoryPort } from "src/domain/ports/user-repository.port";

@Injectable()
export class UpdateUserUseCase {
    constructor(private readonly userRepository: UserRepositoryPort) { }

    async execute(id: string, updatedUser: Partial<UserEntity>): Promise<UserEntity> {
        try {
            const existingUser = await this.userRepository.findOneById(id);
            if (!existingUser) {
                throw new NotFoundException(`L'utilisateur avec l'id ${id} est introuvable.`)
            }
            if (updatedUser.email && updatedUser.email !== existingUser.email) {
                const userWithSameEmail = await this.userRepository.findOneByEmail(updatedUser.email);
                if (userWithSameEmail) {
                    throw new ConflictException(`Le mail ${userWithSameEmail.email} est déjà utilisé.`)
                }

                return await this.userRepository.update(id, updatedUser);
            }
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof ConflictException) {
                throw error
            }
            throw new InternalServerErrorException("Erreur serveur lors de la modification de l'utilisateur.");
        }
    }
}