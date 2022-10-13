import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import {MovieModule} from "./movie/movie.module"

@Module({
  imports: [DatabaseModule, MovieModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
