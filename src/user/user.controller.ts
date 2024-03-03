import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Get("getUser/:id")
    getUser(@Param('userid') id:string){
        return this.userService.getUser(id);
    }

}
