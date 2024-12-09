import { Injectable } from "@nestjs/common";
import { CreateUserUseCase } from "./{use-cases}/create-user.use-case";
import { DeleteUserUseCase } from "./{use-cases}/delete-user.use-case";
import { UpdateUserUseCase } from "./{use-cases}/update-user.use-case";
import { GetOneUserByIdUseCase } from "./{use-cases}/getonebyid-user.use-case";
import { GetAllUserUseCase } from "./{use-cases}/getall-user.use-case";
import { UserEntityDomain } from "src/domain/entities/user.entity";

@Injectable()
export class UserService {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly deleteUserUseCase: DeleteUserUseCase,
        private readonly updateUserUseCase: UpdateUserUseCase,
        private readonly getOneUserByIdUseCase: GetOneUserByIdUseCase,
        private readonly getAllUserUseCase: GetAllUserUseCase,
    ) {}

    createUser(user: UserEntityDomain): Promise<UserEntityDomain> {
        return this.createUserUseCase.execute(user);
    }

    getAllUser(): Promise<UserEntityDomain[]> {
        return this.getAllUserUseCase.execute();
    }

    getOneUserById(id: string): Promise<UserEntityDomain> {
        return this.getOneUserByIdUseCase.execute(id);
    }

    updateUser(id: string, user: Partial<UserEntityDomain>): Promise<UserEntityDomain> {
        return this.updateUserUseCase.execute(id, user);
    }

    DeleteUser(id: string): Promise<boolean> {
        return this.deleteUserUseCase.execute(id);
    }
}