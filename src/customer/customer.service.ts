import { Injectable } from '@nestjs/common';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { Customer } from './dto/create-customer.dto';

@Injectable()
export class CustomerService {
  private customers: Customer[] = [];
  private nextId = 1;

  constructor() {
    this.loadData();
  }

  private loadData() {
    try {
      if (existsSync('customers.json')) {
        const data = JSON.parse(readFileSync('customers.json', 'utf8'));
        this.customers = data.customers || [];
        this.nextId = data.nextId || 1;
      }
    } catch (e) {
        console.log(e);
     }
  }

  private saveData() {
    writeFileSync('customers.json', JSON.stringify({
      customers: this.customers,
      nextId: this.nextId
    }));
  }

  create(name: string, email: string): Customer {
    const customer = { id: this.nextId++, name, email };
    this.customers.push(customer);
    this.saveData();
    return customer;
  }

  findAll(): Customer[] { 
    return this.customers;
  }

  findOne(id: number): Customer {
    const customer = this.customers.find(c => c.id === id);
    if (!customer) throw new Error('Not found');
    return customer;
  }

  update(id: number, name?: string, email?: string): Customer {
    const customer = this.customers.find(c => c.id === id);
    if (!customer) throw new Error('Not found');
    if (name) customer.name = name;
    if (email) customer.email = email;
    this.saveData();
    return customer;
  }

  remove(id: number): string {
    const index = this.customers.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Not found');
    const deleted = this.customers.splice(index, 1)[0];
    this.saveData();
    return `Deleted ${deleted.name}`;
  }
}