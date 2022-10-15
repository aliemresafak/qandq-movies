import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { ConfigModule } from '@nestjs/config';
import { MovieInfo } from './entities/movie-info.entity';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([Movie, MovieInfo]),
  ],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
