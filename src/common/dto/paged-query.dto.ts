import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class PagedQueryDto {
  @IsNumber()
  @Transform((value) => Number(value))
  @IsNotEmpty()
  page: number = 1;

  @IsNumber()
  @Transform((value) => Number(value))
  @IsNotEmpty()
  limit: number = 10;

  @IsString()
  @IsOptional()
  orderBy: string;
}
