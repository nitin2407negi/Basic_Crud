import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { Movie } from './entities/movie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieService } from './movie.service';

@Module({
   imports: [
    TypeOrmModule.forFeature([Movie]),
  ],
  controllers: [MovieController],
  providers: [MovieService]
})
export class MovieModule {}
