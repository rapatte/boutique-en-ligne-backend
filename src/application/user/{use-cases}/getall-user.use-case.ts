import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { UserEntityDomain } from "src/domain/entities/user.entity";
import { UserRepositoryPort } from "src/domain/ports/user-repository.port";

@Injectable()
export class GetAllUserUseCase {
    constructor(
        @Inject('UserRepositoryPort')
        private readonly userRepository: UserRepositoryPort
    ) {}

    async execute(): Promise<UserEntityDomain[]> {
        try {
            return this.userRepository.findAll();
        } catch (error) {
            throw new InternalServerErrorException('Erreur serveur lors de la récupération de tous les utilisateurs.')
        }
    }
}