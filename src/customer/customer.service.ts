import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CustomerDTO } from './dto/create-customer.dto';
import { QueryCustomerDTO } from './dto/query.dto';
import { LoggerDecorator } from 'src/decorators/logger.decorator';

@Injectable()
@LoggerDecorator()
export class CustomerService {
  private customers: CustomerDTO[] = [];

  create(customerDto: CustomerDTO): CustomerDTO {
    const existingCustomer = this.customers.find(c => c.id === customerDto.id);
    if (existingCustomer) {
      console.log('already exist with id');
    }
    const newCustomer = { ...customerDto };
    this.customers.push(newCustomer);
    return newCustomer;
  }

  findAll(): CustomerDTO[] { 
    return this.customers;
  }

 
  findAge(query: QueryCustomerDTO): CustomerDTO[] {
    return this.customers
  }
  

  findOne(id: number): CustomerDTO {
    const customer = this.customers.find(c => c.id === id);
    if (!customer) throw new NotFoundException(`Customer with id ${id} not found`);
    return customer;
  }

  update(id: number, updateCustomerDto: Partial<CustomerDTO>): CustomerDTO {
    const Index = this.customers.findIndex(c => c.id === id);
   
    const { ...updateData } = updateCustomerDto;
    this.customers[Index] = { ...this.customers[Index], ...updateData };
    return this.customers[Index];
  }

  remove(id: number): string {
    const index = this.customers.findIndex(c => c.id === id);
    if (index === -1) throw new NotFoundException(`Customer id ${id} not found`);
    const deleted = this.customers.splice(index, 1)[0];
    return `Deleted `;
  }

  upsert(customerDto: CustomerDTO): CustomerDTO {
    const customer = this.customers.findIndex(c => c.id === customerDto.id);

    if (customer ) {
      return this.update(customerDto.id, customerDto);
    } else {
     
      return this.create(customerDto);
    }
  }
}
