import { ConflictException, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { UserEntityDomain } from "src/domain/entities/user.entity";
import { UserRepositoryPort } from "src/domain/ports/user-repository.port";
import { v4 } from "uuid";
import * as bcrypt from "bcrypt";

@Injectable()
export class CreateUserUseCase {
    constructor(
        @Inject('UserRepositoryPort')
        private readonly userRepository: UserRepositoryPort
    ) { }

    async execute(user: UserEntityDomain): Promise<UserEntityDomain> {
        try {
            if (user.id == undefined) {
                user.id = v4();
            }
            const existingEmail = await this.userRepository.findOneByEmail(user.email)
            if (existingEmail) {
                throw new ConflictException(`Un utilisateur avec l'email ${user.email} existe déjà.`)
            }

            const existingId = await this.userRepository.findOneById(user.id);
            if (existingId) {
                throw new ConflictException(`Un utilisateur avec l'id ${user.id} existe déjà.`)
            }

            const hashedPassword = await bcrypt.hash(user.password, 10);
            const newUser = new UserEntityDomain({...user, password: hashedPassword})

            return await this.userRepository.create(newUser);
        } catch (error) {
            if (error instanceof ConflictException) {
                throw error;
            }
            throw new InternalServerErrorException("Erreur serveur lors de la création de l'utilisateur");
        }
    }
}