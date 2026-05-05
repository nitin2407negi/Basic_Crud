import {
  Controller,
  Post,
  Put,
  Get,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieListDto } from './dto/movie-list.dto';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post('create')
  create(@Body() dto: CreateMovieDto) {
    return this.movieService.createMovie(dto);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() dto: UpdateMovieDto) {
    return this.movieService.updateMovie(id, dto);
  }

  @Get('view/:id')
  get(@Param('id') id: string) {
    return this.movieService.getMovie(id);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.movieService.deleteMovie(id);
  }

  @Post('list')
  list(@Body() dto: MovieListDto) {
    return this.movieService.listMovies(dto);
  }
}