import { Injectable } from '@nestjs/common';
import { DogDto } from './dto/dogdto';
import { CatDto } from './dto/catdto';
import { Animal } from './dto/animal.dto';

@Injectable()
export class AnimalService {
  private cats: Animal[] = [];
  private dogs: Animal[] = [];

  createCat(catData: CatDto): Animal {
    const cat: Animal = { ...catData, type: 'cat' };
    this.cats.push(cat);
    return cat;
  }

  getAllCats(): Animal[] {
    return this.cats;
  }

  clearCats(): void {
    this.cats = [];
  }

  updateCat(id: number, updateData: CatDto): Animal  {
    const catIndex = this.cats.findIndex((cat) => cat.id === id);
   
    this.cats[catIndex] = { ...this.cats[catIndex], ...updateData };
    return this.cats[catIndex];
  }

  deleteCat(id: number) {
    this.cats = this.cats.filter((cat) => cat.id !== id);
    return { success: true };
  }

  createDog(dogData: DogDto): Animal {
    const dog: Animal = { ...dogData, type: 'dog' };
    this.dogs.push(dog);
    return dog;
  }

  getAllDogs(): Animal[] {
    return this.dogs;
  }


  updateDog(id: number, updateData: DogDto): Animal {
    const dogIndex = this.dogs.findIndex((dog) => dog.id === id);
  
    this.dogs[dogIndex] = { ...this.dogs[dogIndex], ...updateData };
    return this.dogs[dogIndex];
  }

  deleteDog(id: number) {
    this.dogs = this.dogs.filter((dog) => dog.id !== id);
    return { message:'deleted' };
  }
  

  
}