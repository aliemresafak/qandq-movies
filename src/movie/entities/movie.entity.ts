import {
  Entity,
  Column,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { MovieInfo } from './movie-info.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  adult: boolean;
  @Column()
  backdrop_path: string;
  @Column()
  original_language: string;
  @Column()
  original_title: string;
  @Column()
  overview: string;
  @Column({ type: 'decimal' })
  popularity: number;
  @Column()
  poster_path: string;
  @Column()
  release_date: string;
  @Column()
  title: string;
  @Column()
  video: boolean;
  @Column({ type: 'decimal', default: 0 })
  vote_average: number;
  @Column()
  vote_count: number;
  @OneToMany(() => MovieInfo, (movieInfo) => movieInfo.movie)
  movieInfos: MovieInfo[];
}
