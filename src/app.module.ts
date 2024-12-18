import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "./infrastructure/database/typeorm/typeorm-config";
import { ProductModule } from "./application/product/product.module";
import { UserModule } from "./application/user/user.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => typeOrmConfig(configService),
        }),
        ProductModule,
        UserModule
    ],
})

export class AppModule { };