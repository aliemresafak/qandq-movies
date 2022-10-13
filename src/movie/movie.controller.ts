import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}


  @Get("?")
  findAll(@Query() query) {
    const { amount } = query
    return this.movieService.findAll(amount);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    console.log(typeof id, id)
    return this.movieService.findOne(Number(id));
  }
}
