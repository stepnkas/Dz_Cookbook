import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!111';
  }

  getPassword():string{
    return Math.round(Math.random()*1000).toString();
  }
}
