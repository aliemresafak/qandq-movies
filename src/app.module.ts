import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import {MovieModule} from "./movie/movie.module"

@Module({
  imports: [DatabaseModule, MovieModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
