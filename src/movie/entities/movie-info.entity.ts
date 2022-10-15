import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsInt, Min, Max } from 'class-validator';
import { Movie } from './movie.entity';
@Entity()
export class MovieInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  note: string;

  @Column()
  @IsInt()
  @Min(1)
  @Max(10)
  point: number;

  @ManyToOne(() => Movie, (movie) => movie.movieInfos)
  movie: Movie;
}
