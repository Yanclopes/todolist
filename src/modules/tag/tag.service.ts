import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagEntity } from './tag.entity';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { ListTagDto } from './dto/list-tag.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private tagRepo: Repository<TagEntity>,
  ) {}

  create(dto: CreateTagDto) {
    const tag = this.tagRepo.create(dto);
    return this.tagRepo.save(tag);
  }

  async findAll(query: ListTagDto) {
    const [items, total] = await this.tagRepo.findAndCount({
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
    return this.tagRepo.findOne({ where: { id } });
  }

  async update(id: number, dto: Partial<CreateTagDto>) {
    await this.tagRepo.update(id, dto);
    return this.findOne(id);
  }

  delete(id: number) {
    return this.tagRepo.delete(id);
  }
}
