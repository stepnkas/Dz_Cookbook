//import { IsNotEmpty, IsString } from 'class-validator';
import { CreateRecipeDTO } from './create.recipe.dto';
import { PartialType, OmitType } from '@nestjs/mapped-types';

export class UpdateRecipeDTO extends PartialType(OmitType(CreateRecipeDTO, ['idUser'] as const),) {

  // @IsString()
  // @IsNotEmpty()
  recipeId: string;
  
}
