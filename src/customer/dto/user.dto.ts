import { ArrayMaxSize, ArrayMinSize, IsArray, IsDateString, IsNotEmpty, IsNumber, IsString, ValidateNested, ArrayUnique, minDate } from "class-validator"
import { Type } from "class-transformer";

export class TaskDTO{
    @IsString()
    @IsNotEmpty()
    @ArrayUnique((task: TaskDTO) => task.title, { message: 'Task titles must be unique.' })
    title:string

    @IsDateString()
    @IsNotEmpty()
    @MinDate(new Date)
    startDate:Date

    @IsDateString()
    @IsNotEmpty()
    endDate:string
}

export class UserDTO{
    @IsString()
    @IsNotEmpty()
    name:string

    @IsNumber()
    age:number

    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    @ArrayMaxSize(5)
    @Type(() => TaskDTO)
    task:TaskDTO[]
}
