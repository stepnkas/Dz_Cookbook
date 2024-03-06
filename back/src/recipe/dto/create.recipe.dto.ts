
//import { IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"

export class CreateRecipeDTO{
    // @IsNotEmpty()
    // @IsString()
    // @MinLength(10)
    // @MaxLength(200)
    title: string

    // @IsNotEmpty()
    // @IsString()
    // @MaxLength(3000)
    description: string
    ingredient: string

    // @IsNotEmpty()
    // @IsEnum(Priority)
    // @IsNotEmpty()
    // @IsString()
    userId: string
}
