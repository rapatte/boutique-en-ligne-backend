import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "src/infrastructure/database/typeorm/adapters/user.repository";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { CreateUserUseCase } from "./{use-cases}/create-user.use-case";
import { UpdateUserUseCase } from "./{use-cases}/update-user.use-case";
import { DeleteUserUseCase } from "./{use-cases}/delete-user.use-case";
import { GetAllUserUseCase } from "./{use-cases}/getall-user.use-case";
import { GetOneUserByIdUseCase } from "./{use-cases}/getonebyid-user.use-case";
import { UserEntity } from "src/infrastructure/database/typeorm/entities/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [UserController],
    providers: [
        {
            provide: 'UserRepositoryPort', // Nom explicite pour le port
            useClass: UserRepository, // Liaison avec l'implémentation concrète
        },
        UserService,
        CreateUserUseCase,
        UpdateUserUseCase,
        DeleteUserUseCase,
        GetAllUserUseCase,
        GetOneUserByIdUseCase
    ],
    exports: [UserService],
})

export class UserModule {};