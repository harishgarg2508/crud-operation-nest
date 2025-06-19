import { Controller, Post, Body, Get, Param, Delete, Put } from '@nestjs/common';
import { AnimalService } from './animal.service';
import { Animal } from './dto/animal.dto';
import { DogDto } from './dto/dogdto';
import { CatDto } from './dto/catdto';

@Controller('animals')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @Post('cat')
  createCat(@Body() body: CatDto): Animal {
    return this.animalService.createCat(body);
  }

  @Get('cat')
  getAllCats(): Animal[] {
    return this.animalService.getAllCats();
  }

  @Put('cat/:id')
  updateCat(@Param('id') id: string,@Body() body: CatDto,): Animal {
    return this.animalService.updateCat(parseInt(id, 10), body);
  }

  @Delete('cat/:id')
  deleteCat(@Param('id') id: string){
    return this.animalService.deleteCat(parseInt(id, 10));
  }

  @Post('dog')
  createDog(@Body() body: DogDto): Animal {
    return this.animalService.createDog(body);
  }

  @Get('dog')
  getAllDogs(): Animal[] {
    return this.animalService.getAllDogs();
  }

  @Put('dog/:id')
  updateDog(@Param('id') id: string,@Body() body: DogDto,): Animal{
    return this.animalService.updateDog(parseInt(id, 10), body);
  }

  @Delete('dog/:id')
  deleteDog(@Param('id') id: string) {
    return this.animalService.deleteDog(parseInt(id, 10));
  }


}