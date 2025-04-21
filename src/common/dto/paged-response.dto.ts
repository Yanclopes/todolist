import { IsArray, IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class PagedResponseDto<T> {
  @IsNumber()
  total: number;

  @IsNotEmpty()
  @IsArray()
  items: T[];

  @IsBoolean()
  hasMore: boolean;

  @IsNumber()
  currentPage?: number;

  @IsNumber()
  pageSize?: number;

  @IsNumber()
  totalPages?: number;
}
