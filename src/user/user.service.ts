import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    
    constructor(private readonly prismaService: PrismaService) {

    }

    test='1';
    getHello(){
        return '1111';
    }

    async getUser(id:string){
        const data=await this.prismaService.user.findMany(
            {where:{
                id:id
            }
        }
        );
        return data;
    }


}
