import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ListUserDto } from './dto/list-user.dto';
import { PagedResponseDto } from '../../communs/dto/paged-response.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  create(dto: CreateUserDto) {
    const user = this.userRepo.create(dto);
    return this.userRepo.save(user);
  }
  async findAll(query: ListUserDto): Promise<PagedResponseDto<UserEntity>> {
    const [items, total] = await this.userRepo.findAndCount({
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    });

    const totalPages = Math.ceil(total / query.limit);

    return {
      total,
      items,
      hasMore: query.page < totalPages,
      currentPage: query.page,
      pageSize: query.limit,
      totalPages,
    };
  }

  findOne(id: number) {
    return this.userRepo.findOne({ where: { id } });
  }

  async update(id: number, dto: Partial<CreateUserDto>) {
    await this.userRepo.update(id, dto);
    return this.findOne(id);
  }

  delete(id: number) {
    return this.userRepo.delete(id);
  }
}
