import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { UserEntity } from "src/domain/entities/user.entity";
import { UserRepositoryPort } from "src/domain/ports/user-repository.port";

@Injectable()
export class GetOneUserById {
    constructor(private readonly userRepository: UserRepositoryPort) { }

    async execute(id: string): Promise<UserEntity> {
        try {
            const user = await this.userRepository.findOneById(id);
            if (!user) {
                throw new NotFoundException(`Aucun utilisateur avec l'id ${id} n'a été trouvé.`)
            }

            return this.userRepository.findOneById(id);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException("Erreur serveur lors de la récupération de l'utilisateur");
        }
    }
}