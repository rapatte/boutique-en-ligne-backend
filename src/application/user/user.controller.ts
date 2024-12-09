import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserEntityDomain } from "src/domain/entities/user.entity";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createUser(@Body() user: UserEntityDomain): Promise<UserEntityDomain> {
        return await this.userService.createUser(user);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAllUser(): Promise<UserEntityDomain[]> {
        return await this.userService.getAllUser();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getOneById(@Param('id') id: string): Promise<UserEntityDomain> {
        return await this.userService.getOneUserById(id);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    async updateUser(
        @Param('id') id: string,
        @Body() updatedUser: Partial<UserEntityDomain>
    ): Promise<UserEntityDomain> {
        return await this.userService.updateUser(id, updatedUser);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async deleteUser(@Param('id') id: string): Promise<Boolean> {
        return await this.userService.DeleteUser(id);
    }
}