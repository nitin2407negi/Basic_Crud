import {
  IsOptional,
  IsNumberString,
  IsString,
  IsIn,
} from 'class-validator';

export class MovieListDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsNumberString()
  limit?: number;

  @IsOptional()
  @IsNumberString()
  page?: number;

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  order?: 'ASC' | 'DESC';

  @IsOptional()
  @IsIn(['title', 'genre', 'releaseYear', 'created_at'])
  orderColumn?: 'title' | 'genre' | 'releaseYear' | 'created_at';
}