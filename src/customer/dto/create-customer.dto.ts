import {  Type } from "class-transformer"
import { IsAlpha, IsAlphanumeric, IsArray, IsBoolean, IsDateString, IsEmail, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, MaxLength, MinLength, ValidateNested,  } from "class-validator"




export class subjectDTO{
    @IsArray()
    @IsString({each:true})
    subject:string[]
}

export class AddressDTO{
    @IsString()
    @IsNotEmpty()
    city:string
    @IsString()
    @IsNotEmpty()
    state:string
    @IsString()
    @IsNotEmpty()
    country:string
    @IsNumber()
    @IsNotEmpty()
    pincode:number
}
export class StudyDTO{
    @IsString()
    @IsNotEmpty()
    degree:string

    @ValidateNested()
    @IsArray()
    @Type(()=>subjectDTO)
    subject:subjectDTO[]
}
export class CustomerDTO{
    
    @IsNotEmpty()
    @IsNumber({},{message:'is should be a number'})
    id:number

    
    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsString()
    @IsNotEmpty()
    name:string
    
    @IsNumber()
    @IsNotEmpty()
    age:number
    
    @IsNumber()
    phone:number

    @MinLength(4,{message:"minimum length should be 4"})
    @MaxLength(10,{message:"minimum length should be 10"})
    @IsAlphanumeric()
    password:string


    @ValidateNested()
    @IsObject()
    @Type(()=>AddressDTO)
    address:AddressDTO

    @IsBoolean()
    IsActive:boolean

    @IsDateString({},{message:'must be a valid date string'})
    createdAt?:string


    @IsArray()
    @IsString({each:true})
    hobbies:string[]

    @IsArray({ message: 'The "study" field must be an array.' })
    @IsArray({ each: true })
    study: string[][];











}


// {
    
//     "id":1,
//     "email":"harish@gmail.com",
//     "name":"Rishu",
//     "age":2,
//     "phone":1234567890,
//     "password":"abcabc",
//     "address":{"city":"chandigarh","state":"Punjab","country":"India","pincode":123456},
//     "IsActive":true,
//     "createdAt":"20250618",
//     "hobbies": ["reading","playing","traveling","123"],
//     "study": [["CSE"],["Physics","Maths"]]


// }
