export interface Animal {
  id: number;
  name: string;
  age: number;
  type: 'cat' | 'dog';
}

export type AnimalType = 'cat' | 'dog';