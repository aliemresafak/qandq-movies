import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async(configService: ConfigService) => {
            return {
                type: "postgres",
                host: "db",
                database: configService.get("DB_NAME"),
                username: configService.get("DB_USER"),
                password: configService.get("DB_PASS"),
                entities: [`${__dirname}/../**/*.entity.{js,ts}`],
                synchronize: true,
                logging: true
            }
        }
    })],
})
export class DatabaseModule {}
