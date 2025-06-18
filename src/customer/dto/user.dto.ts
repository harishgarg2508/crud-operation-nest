import { ArrayMaxSize, ArrayMinSize, IsArray, IsDateString, IsNotEmpty, IsNumber, IsString, ValidateNested, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, Validate, ArrayUnique } from "class-validator";
import { Type } from "class-transformer";


@ValidatorConstraint({ name: 'startDate', async: false })
export class StartDateValidation implements ValidatorConstraintInterface {
  validate(value: Date): boolean {
    const startDate = new Date(value);
    const currentDate = new Date();
    return startDate > currentDate;
  }
  defaultMessage(): string {
    return 'Start date must be greater than current time';
  }
}


@ValidatorConstraint({ name: 'endDate', async: false })
export class EndDateValidation implements ValidatorConstraintInterface {
  validate(value: Date, args: ValidationArguments): boolean {
    const object = args.object as TaskDTO;
    const startDate = new Date(object.startDate);
    const endDate = new Date(value);
    return endDate > startDate;
  }
  defaultMessage(): string {
    return 'End date must be greater than start date';
  }
}


export class TaskDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDateString()
  @IsNotEmpty()
  @Validate(StartDateValidation)
  startDate: string;

  @IsDateString()
  @IsNotEmpty()
  @Validate(EndDateValidation)
  endDate: string;
}

export class UserDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  age: number;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  @ArrayUnique((task: TaskDTO) => task.title, { message: 'Task titles within this user must be unique.' })
  @Type(() => TaskDTO)
  tasks: TaskDTO[];
}