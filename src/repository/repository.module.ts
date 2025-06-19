import { Module } from '@nestjs/common';
import { RepositoryService } from './repository.service';
import { RepositoryController } from './repository.controller';

export class Item{
    id: number;
    name: string;
    price: number;

}
@Module({
  providers: [RepositoryService],
  controllers: [RepositoryController]
})
export class RepositoryModule {}  