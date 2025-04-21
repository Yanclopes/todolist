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
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { ListTagDto } from './dto/list-tag.dto';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post() async create(@Body() dto: CreateTagDto) {
    return await this.tagService.create(dto);
  }

  @Get()
  async findAll(@Query() query: ListTagDto) {
    return await this.tagService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.tagService.findOne(id);
  }

  @Put(':id') async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<CreateTagDto>,
  ) {
    return await this.tagService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.tagService.delete(id);
  }
}
