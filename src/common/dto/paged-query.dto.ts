import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class PagedQueryDto {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  page: number = 1;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  limit: number = 10;

  @IsString()
  @IsOptional()
  orderBy?: string;
}
