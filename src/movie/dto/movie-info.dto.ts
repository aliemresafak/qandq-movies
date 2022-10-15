import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min, Max } from 'class-validator';
import { Movie } from '../entities/movie.entity';

export class MovieInfoDto {
  @ApiProperty()
  note: string;
  @ApiProperty()
  @IsInt()
  @Min(1)
  @Max(10)
  point: number;
  @ApiProperty()
  movie: Movie;
}
