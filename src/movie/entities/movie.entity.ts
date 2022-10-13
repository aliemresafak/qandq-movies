import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn("increment")
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
  @Column({type: "decimal"})
  popularity: number;
  @Column()
  poster_path: string;
  @Column()
  release_date: string;
  @Column()
  title: string;
  @Column()
  video: boolean;
  @Column({ type: "decimal", default: 0})
  vote_average: number;
  @Column()
  vote_count: number;
}
