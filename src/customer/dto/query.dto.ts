import { IsOptional, IsString } from "class-validator";

export class QueryCustomerDTO {
  @IsOptional()
  @IsString()
  age?: number;
}