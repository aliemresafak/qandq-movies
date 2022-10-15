import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Movie } from './entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { firstValueFrom } from 'rxjs';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import { MovieInfoDto } from './dto/movie-info.dto';
import { MovieInfo } from './entities/movie-info.entity';
import { round } from 'src/utils';

@Injectable()
export class MovieService implements OnApplicationBootstrap {
  private readonly logger = new Logger(MovieService.name);

  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Movie) private movieRepository: Repository<Movie>,
    @InjectRepository(MovieInfo)
    private movieInfoRepository: Repository<MovieInfo>,
    private readonly configService: ConfigService,
  ) {}

  private async getPopularMovies() {
    let url = `https://api.themoviedb.org/3/movie/popular?api_key=${this.configService.get(
      'API_KEY',
    )}&language=en-US&page=1`;
    let response = firstValueFrom(await this.httpService.get(url));
    let data: Array<Movie> = new Array<Movie>();
    for await (const movie of (await response)?.data.results) {
      let { genre_ids, id, ...movie_data } = movie;
      data.push(movie_data);
    }
    this.logger.verbose('get popular movies');
    return data;
  }

  async onApplicationBootstrap() {
    this.logger.log('MovieService onApplicationBootstrap');
    let data = await this.getPopularMovies();
    this.movieRepository.save(data);
  }

  @Cron(CronExpression.EVERY_2_HOURS)
  async getDataBySchedule() {
    this.getPopularMovies();
  }

  async findAll(amount: number = null) {
    if (amount) {
      return await this.movieRepository.find({ take: Number(amount) });
    }
    return await this.movieRepository.find();
  }

  async findOne(id: number) {
    const result = await this.movieInfoRepository
      .createQueryBuilder('movie_info')
      .select('SUM(movie_info.point)', 'totalPoint')
      .addSelect('COUNT(*)', 'amountPoint')
      .getRawOne();
    let movie = await this.movieRepository.findOne({ where: { id } });
    const { totalPoint, amountPoint } = result;
    const totalPointFromData = Number(movie.vote_average) * movie.vote_count;
    const newAmountVote = movie.vote_count + Number(amountPoint);
    movie.vote_average = round(
      (totalPointFromData + Number(totalPoint)) / newAmountVote,
    );
    movie.vote_count = newAmountVote;
    return movie;
  }

  async addMovieInfo(id: number, movieInfoDto: MovieInfoDto) {
    console.log('addMovieInfo services');
    console.log(id, movieInfoDto);
    let movieInfo = await this.movieInfoRepository.create(movieInfoDto);
    await this.movieInfoRepository.save(movieInfo);
    return movieInfo;
  }
}
