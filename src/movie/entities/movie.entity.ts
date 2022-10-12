import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryColumn()
  id:number
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
  @Column()
  popularity: number;
  @Column()
  poster_path: string;
  @Column()
  release_date: string;
  @Column()
  title: string;
  @Column()
  video: boolean;
  @Column()
  vote_average: number;
  @Column()
  vote_count: number;
}
