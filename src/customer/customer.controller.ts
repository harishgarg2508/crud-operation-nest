import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, ValidationPipe, Query } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDTO } from './dto/create-customer.dto';
import { QueryCustomerDTO } from './dto/query.dto';
import { UserDTO } from './dto/user.dto';
import { LoggerDecorator } from 'src/decorators/logger.decorator';

@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}
  @Post()
  create(@Body(ValidationPipe) customerData: CustomerDTO): CustomerDTO {
    return this.customerService.create(customerData);
  }
  
  @Get()
  findAll(): CustomerDTO[] {
    return this.customerService.findAll();
  }
  
  @Get('search')
  findAge(@Query('age') query:QueryCustomerDTO): CustomerDTO[] { 
    return this.customerService.findAge(query);
  }
  
  @Get(':id')
  findOne(@Param('id') id: number): CustomerDTO {
    return this.customerService.findOne(id);
  }
  
  @Put(':id')
  update(@Param('id') id: number, @Body() body: Partial<CustomerDTO>): CustomerDTO {
    return this.customerService.update(id, body);
  }
  
  @Delete(':id')
  remove(@Param('id') id: number): { message: string } {
    const message = this.customerService.remove(id);
    return { message };
  }
  
  @Post('upsert')
  upsert(@Body() body: CustomerDTO): CustomerDTO {
    return this.customerService.upsert(body);
  }
  
  @Post('user')
  createUser(@Body() userdata:UserDTO){
    console.log("data received")
    return {message : "user created successfully"}
  }


}