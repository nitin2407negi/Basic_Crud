import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  genre!: string;

  @IsInt()
  releaseYear!: number;
}