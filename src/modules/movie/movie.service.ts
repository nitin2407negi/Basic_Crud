import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieListDto } from './dto/movie-list.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepo: Repository<Movie>,
  ) {}

  // Create
  async createMovie(dto: CreateMovieDto) {
    const existing = await this.movieRepo.findOne({
      where: { title: dto.title },
    });

    if (existing) {
      throw new BadRequestException(
        'Movie with this title already exists',
      );
    }

    const movie = this.movieRepo.create(dto);
    const saved = await this.movieRepo.save(movie);

    return {
      message: 'Movie created successfully',
      id: saved.id,
    };
  }

  // Update
  async updateMovie(id: string, dto: UpdateMovieDto) {
    const movie = await this.movieRepo.findOne({ where: { id } });

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    Object.assign(movie, dto);
    const updated = await this.movieRepo.save(movie);

    return {
      message: 'Movie updated successfully',
      id: updated.id,
    };
  }

  // Get
  async getMovie(id: string) {
    const movie = await this.movieRepo.findOne({ where: { id } });

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    return {
      message: 'Movie fetched successfully',
      data: movie,
    };
  }

  // Delete
  async deleteMovie(id: string) {
    const result = await this.movieRepo.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Movie not found');
    }

    return {
      message: 'Movie deleted successfully',
      id,
    };
  }

  // List
  async listMovies(dto: MovieListDto) {
    const {
      search,
      limit = 10,
      page = 1,
      order = 'ASC',
      orderColumn = 'created_at',
    } = dto;

    const qb = this.movieRepo.createQueryBuilder('movie');

    if (search) {
      qb.where(
        'movie.title ILIKE :search OR movie.genre ILIKE :search',
        {
          search: `%${search}%`,
        },
      );
    }

    qb.orderBy(`movie.${orderColumn}`, order as 'ASC' | 'DESC');

    const skip = (Number(page) - 1) * Number(limit);

    qb.skip(skip).take(Number(limit));

    const [movies, total] = await qb.getManyAndCount();

    return {
      result: movies,
      totalRecords: total,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      limit: Number(limit),
    };
  }
}