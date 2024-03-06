import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRecipeDTO } from './dto/create.recipe.dto';
import { UpdateRecipeDTO } from './dto/update.recipe.dto';

@Injectable()
export class RecipeService {

  //Подключаем к нашему сервису prismaService
  constructor(private readonly prismaService: PrismaService) {}

  //Здесь находится вся логика с ToDo карточками
  async CreateRecipe(data: CreateRecipeDTO) {
    console.log(data)
    try {
      return await this.prismaService.recipe.create({
        data: {
          title: data.title,
          description: data.description,
          userId: data.userId,
          ingredient: data.ingredient,
          updatedAt: '00',
          createdAt: '00'
        },
      });
    } catch (error) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
  }

  async UpdateRecipe(data: UpdateRecipeDTO) {
    try {
      console.log(data)
      return await this.prismaService.recipe.update({
        where: { id: data.recipeId },
        data: {
          title: data.title,
          description: data.description,
          ingredient: data.ingredient,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  async DeleteRecipe(id: string) {
    try {
      await this.prismaService.recipe.delete({ where: { id: id } });
      return HttpStatus.OK;
    } catch (error) {
      throw new HttpException('To do is not exist', HttpStatus.NOT_FOUND);
    }
  }

  async GetOneRecipeOrAll(userId: string, recipeId?: string) {
    try {
      if (recipeId) {
        return this.prismaService.recipe.findFirst({ where: { id: recipeId } });
      } else {
        return this.prismaService.recipe.findMany({ where: { userId: userId } });
      }
    } catch (error) {}
  }

  //Работа с пользователем, это, по-хорошему, перенести вообще в другой модуль

  async GetUser(vkId: string) {
    try {
      return await this.prismaService.user.findFirst({ where: { idVk: vkId } });
    } catch (error) {
      throw new HttpException('user nod exist', HttpStatus.NOT_FOUND);
    }
  }

  async CreateUser(vkId: string,name:string) {
    try {
      return await this.prismaService.user.create({
        data: {
          idVk: vkId,
          name:name
        },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  //Основной контроллер, скажем так, регистрации, мы создаем запись в нашей бд если юзера в ней нет, если есть, просто возвращаем его данные
  async UserController(data) {
    try {
      const existUser = await this.GetUser(data.vkId);
      if (!existUser) {
        return await this.CreateUser(data.vkId, data.name);
      }
      return existUser;
    } catch (error) {}
  }
}
