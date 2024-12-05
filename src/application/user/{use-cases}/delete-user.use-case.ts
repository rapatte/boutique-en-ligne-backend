import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { UserRepositoryPort } from "src/domain/ports/user-repository.port";

@Injectable()
export class DeleteUserUseCase {
    constructor(private readonly userRepository: UserRepositoryPort) { }

    async execute(id: string): Promise<boolean> {
        try {
            const user = await this.userRepository.findOneById(id);
            if (!user) {
                throw new NotFoundException(`Suppression impossible car l'utilisateur avec l'id ${id} est introuvable.`)
            }

            return await this.userRepository.delete(id);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException("Erreur serveur lors de la suppression de l'utilisateur");
        }
    }
}