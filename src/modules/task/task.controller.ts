import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ListTaskDto } from './dto/list-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post() async create(@Body() dto: CreateTaskDto) {
    return await this.taskService.create(dto);
  }

  @Get() async findAll(@Query() query: ListTaskDto) {
    return await this.taskService.findAll(query);
  }

  @Get(':id') async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.taskService.findOne(id);
  }

  @Put(':id') async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<CreateTaskDto>,
  ) {
    return await this.taskService.update(id, dto);
  }

  @Delete(':id') async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.taskService.delete(id);
  }
}
