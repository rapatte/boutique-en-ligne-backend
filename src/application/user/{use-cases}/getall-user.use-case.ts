import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { UserEntity } from "src/domain/entities/user.entity";
import { UserRepositoryPort } from "src/domain/ports/user-repository.port";

@Injectable()
export class GetAllUserUseCase {
    constructor(private readonly userRepository: UserRepositoryPort) {}

    async execute(): Promise<UserEntity[]> {
        try {
            return this.userRepository.findAll();
        } catch (error) {
            throw new InternalServerErrorException('Erreur serveur lors de la récupération de tous les utilisateurs.')
        }
    }
}