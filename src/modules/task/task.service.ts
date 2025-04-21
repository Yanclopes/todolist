import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { ListTaskDto } from './dto/list-task.dto';
import { PagedResponseDto } from '../../communs/dto/paged-response.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepo: Repository<TaskEntity>,
  ) {}

  async create(dto: CreateTaskDto) {
    const task = this.taskRepo.create(dto);
    return this.taskRepo.save(task);
  }

  async findAll(query: ListTaskDto): Promise<PagedResponseDto<TaskEntity>> {
    const [items, total] = await this.taskRepo.findAndCount({
      skip: (query.page - 1) * query.limit,
      take: query.limit,
      relations: ['user', 'category', 'tags'],
      order: { createdAt: 'DESC' },
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

  async findOne(id: number) {
    return this.taskRepo.findOne({
      where: { id },
      relations: ['user', 'category', 'tags'],
    });
  }

  async update(id: number, dto: Partial<CreateTaskDto>) {
    await this.taskRepo.update(id, dto);
    return this.findOne(id);
  }

  delete(id: number) {
    return this.taskRepo.delete(id);
  }
}
