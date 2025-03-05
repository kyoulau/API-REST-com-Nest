import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './DTO/create-user-dto';
import { GetUserDto } from './DTO/get-user-dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService){}


//post user
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto){
    return this.userService.createUserService(createUserDto)
  }

  @Get()
  async getAllUsers(): Promise<GetUserDto[]>{
    const allUsers = await this.userService.findAllUsers();
    return allUsers.map( user =>({
      username: user.username,
      userEmail:user.userEmail,
      userPassword:user.userPassword,
      userRoleAtributed:user.userRoleAtributed,
      "createdAt":user.createdAt
    }))
  }

  //get user{id}

  //update userd{id}

  //delete user{id}
}
