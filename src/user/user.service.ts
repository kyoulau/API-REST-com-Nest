import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetUserDto } from './DTO/get-user-dto';
import { User } from '@prisma/client';
import { CreateUserDto } from './DTO/create-user-dto';

@Injectable()
export class UserService {
  constructor (
    private prisma: PrismaService,
    // hashing
  ){}


  // id Int @id @default(autoincrement())
  // username String
  // userEmail String
  // active Boolean @default(true)
  // userPassword String
  // createdAt DateTime? @default(now())
  // userRoleAtributed String
  // Task Task[]
  async createUserService(createUserDto: CreateUserDto){
    try {

      const newUser = await this.prisma.user.create({
         data:{
          username: createUserDto.username,
          userEmail: createUserDto.userEmail,
          userPassword: createUserDto.userPassword,
          userRoleAtributed:createUserDto.userRoleAtributed,
         },select:{
          id:true,
          username:true,
          userEmail:true
         }
      })

      return newUser
      
    } catch (error) {
      console.log(error);
      throw new HttpException("Failed to create the user",HttpStatus.BAD_REQUEST)
    }

  }

  async findAllUsers():Promise<GetUserDto[]>{
    try {
      const user: User[] = await this.prisma.user.findMany()
      return user
    } catch (error) {
      console.log(error);
      throw new HttpException("Failed to return all the users",HttpStatus.BAD_REQUEST)
    }
  }
}
