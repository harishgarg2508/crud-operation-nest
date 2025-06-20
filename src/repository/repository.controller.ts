import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RepositoryService } from './repository.service';

@Controller('data/:type')
export class RepositoryController<T> {
  constructor(private readonly RepositoryService: RepositoryService<T>) {}

  @Post()
  create(@Param('type') type: string, @Body() data: T) {
    return this.RepositoryService.create(type, data);
  }

  @Get()
  findAll(@Param('type') type: string) {
    return this.RepositoryService.findAll(type);
  }

  @Get(':id')
  findOne(@Param('type') type: string, @Param('id') id: string) {
    return this.RepositoryService.findOne(type, +id);
  }

  @Put(':id')
  update(@Param('type') type: string, @Param('id') id: string, @Body() data: Partial<T>) {
    return this.RepositoryService.update(type, +id, data);
  }

  @Delete(':id')
  delete(@Param('type') type: string, @Param('id') id: string) {
    return this.RepositoryService.delete(type, +id);
  }

  @Put(':id/upsert')
  upsert(@Param('type') type: string, @Param('id') id: string, @Body() data: T) {
    return this.RepositoryService.upsert(type, +id, data);
  }
}