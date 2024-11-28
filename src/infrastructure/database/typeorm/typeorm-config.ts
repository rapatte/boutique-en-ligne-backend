import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { ProductEntity } from "./entities/product.entity";

export const typeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: configService.get<string>(process.env.DATABASE_HOST),
    port: configService.get<number>(process.env.DATABASE_PORT),
    username: configService.get<string>(process.env.DATABASE_USERNAME),
    password: configService.get<string>(process.env.DATABASE_PASSWORD),
    database: configService.get<string>(process.env.DATABASE_NAME),
    entities: [UserEntity, ProductEntity],
    synchronize: true, // A DESACTIVER EN PROD
})