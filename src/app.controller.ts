import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';


@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get()
  test():string{
    return this.appService.getHello()
  }

  @Get("/hi/")
  test2(id:string):string{
    
    return `привет ${id}`
  }
  @Get("getPass")
  getPass():string{
    
    return this.appService.getPassword();
  }

  @Post()
  setUser():string {
    return "";
  }

}
