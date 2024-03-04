import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDTO } from './dto/create.recipe.dto';
import { UpdateRecipeDTO } from './dto/update.recipe.dto';
import { CreateUserDTO } from './dto/create.user.dto';
//import {  } from '@prisma/client';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post('create/user')
  async CreateUserController(@Body() data: CreateUserDTO) {
    return this.recipeService.CreateUser(data.idVk,data.name);
  }

  @Post('create')
  async CreateRecipeController(@Body() data: CreateRecipeDTO) {
    return this.recipeService.CreateRecipe(data);
  }

  @Put('update')
  async UpdateRecipeController(@Body() data: UpdateRecipeDTO) {
    // console.log(data)
    return this.recipeService.UpdateRecipe(data);
  }

  @Delete('delete/:id')
  async DeleteRecipeController(@Param('id') id: string) {
    return this.recipeService.DeleteRecipe(id);
  }

  @Get(':userid')
  async GetRecipeController(
    @Param('userid') id: string,
    @Query('recipeid') recipeid?: string,
  ) {
    return this.recipeService.GetOneRecipeOrAll(id, recipeid);
  }

  @Get('user/:id')
  async GetUserByVkID(@Param('id') id: string) {
    return this.recipeService.GetUser(id);
  }

  @Post('user/controll')
  async UserControllController(@Body() data: CreateUserDTO){
    console.log(data)
    return await this.recipeService.UserController(data)
  }
}
