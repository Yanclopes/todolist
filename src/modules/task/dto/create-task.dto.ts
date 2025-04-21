import {
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  IsInt,
  IsArray,
  IsString,
} from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isDone?: boolean;

  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsOptional()
  @IsInt()
  categoryId?: number;

  @IsOptional()
  @IsArray()
  tagIds?: number[];
}
