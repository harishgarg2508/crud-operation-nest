import { Injectable, NotFoundException } from '@nestjs/common';
import { LRUCache } from './lru.service';

@Injectable()
export class RepositoryService<T> {
  private db = new LRUCache<string, T[]>(3);

  private ensureCollection(type: string) {
    if (!this.db.has(type)) {
      console.log("new array created");
      this.db.set(type, []);
    }
  }

  create(type: string, data: T) {
    this.ensureCollection(type);
    const collection = this.db.get(type)!;
    const id = collection.length + 1;
    const newItem = { id, ...data };
    
    collection.push(newItem);
    this.db.set(type, collection); 
    console.log('Node added:');
    return newItem;
  }

  findAll(type: string) {
    return this.db.get(type) || [];
  }

  findOne(type: string, id: number) {
    const collection = this.db.get(type);
    if (!collection) throw new NotFoundException(`No type: ${type}`);
    const item = collection.find((item:any) => item.id === id);
    return item;
  }

  update(type: string, id: number, data) {
    const collection = this.db.get(type);
    if (!collection) throw new NotFoundException(`No type: ${type}`);
    const index = collection.findIndex((item:any) => item.id === id);
    collection[index] = { ...collection[index], ...data };
    this.db.set(type, collection); 
    return{message:"updated"};
  }

  delete(type: string, id: number) {
    const collection = this.db.get(type);
    if (!collection) throw new NotFoundException(`No type: ${type}`);
    const index = collection.findIndex((item:any) => item.id === id);
    collection.splice(index, 1);
    this.db.set(type, collection); 
    return {message: "deleted"}
  }

  upsert(type: string, id: number, data: T) {
    const collection = this.db.get(type);
    if (collection && collection.some((item:any) => item.id === id)) {
      return this.update(type, id, data);
    } else {
      return this.create(type, { ...data, id });
    }
  }
}