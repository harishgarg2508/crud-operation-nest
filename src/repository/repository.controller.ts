import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RepositoryService } from './repository.service';

@Controller('data')
export class RepositoryController<T> {
  constructor(private readonly RepositoryService: RepositoryService<T>) {}

  @Post(':type')
  create(@Param('type') type: string, @Body() data: T) {
    return this.RepositoryService.create(type, data);
  }

  @Get(':type')
  findAll(@Param('type') type: string) {
    return this.RepositoryService.findAll(type);
  }

  @Get(':type/:id')
  findOne(@Param('type') type: string, @Param('id') id: string) {
    return this.RepositoryService.findOne(type, +id);
  }

  @Put(':type/:id')
  update(@Param('type') type: string, @Param('id') id: string, @Body() data: Partial<T>) {
    return this.RepositoryService.update(type, +id, data);
  }

  @Delete(':type/:id')
  delete(@Param('type') type: string, @Param('id') id: string) {
    return this.RepositoryService.delete(type, +id);
  }

  @Put(':type/:id/upsert')
  upsert(@Param('type') type: string, @Param('id') id: string, @Body() data: T) {
    return this.RepositoryService.upsert(type, +id, data);
  }

  @Get('lru')
  getLru() {
    return this.RepositoryService.getLru();
  }

  @Get('mru')
  getMru() {
    return this.RepositoryService.getMru();
  }
}