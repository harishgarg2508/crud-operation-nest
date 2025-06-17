import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Customer } from './dto/create-customer.dto';

@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Post()
  create(@Body() body: Customer): Customer {
    return this.customerService.create(body.name, body.email);
  }

  @Get()
  findAll(): Customer[] {
    return this.customerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Customer {
    return this.customerService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any): Customer {
    return this.customerService.update(Number(id), body.name, body.email);
  }

  @Delete(':id')
  remove(@Param('id') id: string): { message: string } {
    const message = this.customerService.remove(Number(id));
    return { message };
  }
}