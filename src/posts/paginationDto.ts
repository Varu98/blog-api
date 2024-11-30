import { IsInt, IsOptional, Min } from 'class-validator';

export class paginationDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number = 10;
}
