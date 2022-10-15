import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { MovieInfoDto } from './dto/movie-info.dto';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('?')
  findAll(@Query() query) {
    const { amount } = query;
    return this.movieService.findAll(amount);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    console.log(typeof id, id);
    return this.movieService.findOne(Number(id));
  }
  @Post(':id/movieinfo')
  addMovieInfo(@Param('id') id: number, @Body() movieInfoDto: MovieInfoDto) {
    console.log(id, movieInfoDto);
    return this.movieService.addMovieInfo(id, movieInfoDto);
  }
}
