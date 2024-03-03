
//import { IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"

export class CreateRecipeDTO{
    // @IsNotEmpty()
    // @IsString()
    // @MinLength(10)
    // @MaxLength(200)
    name: string

    // @IsNotEmpty()
    // @IsString()
    // @MaxLength(3000)
    description: string

    // @IsNotEmpty()
    // @IsEnum(Priority)
    // @IsNotEmpty()
    // @IsString()
    idUser: string
}