import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ListCategoryDto } from './dto/list-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepo: Repository<CategoryEntity>,
  ) {}

  create(dto: CreateCategoryDto) {
    const category = this.categoryRepo.create(dto);
    return this.categoryRepo.save(category);
  }

  async findAll(query: ListCategoryDto) {
    const [items, total] = await this.categoryRepo.findAndCount({
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    });

    return {
      items,
      total,
      hasMore: query.page * query.limit < total,
      currentPage: query.page,
      pageSize: query.limit,
      totalPages: Math.ceil(total / query.limit),
    };
  }

  findOne(id: number) {
    return this.categoryRepo.findOne({ where: { id } });
  }

  async update(id: number, dto: Partial<CreateCategoryDto>) {
    await this.categoryRepo.update(id, dto);
    return this.findOne(id);
  }

  delete(id: number) {
    return this.categoryRepo.delete(id);
  }
}
