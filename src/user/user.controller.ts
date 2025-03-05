import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './DTO/create-user-dto';
import { GetUserDto } from './DTO/get-user-dto';
import { UpdateUserDto } from './DTO/update-user-dto';
import { LoggersInterceptor } from 'src/Interceptors/log-interceptors';

@Controller('user')
export class UserController {
  constructor(private userService: UserService){}

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

@Get(':id')
@UseInterceptors(LoggersInterceptor)
async getUserById(
  @Param('id', ParseIntPipe)id:number
) {
  const uniqueUser = await this.userService.getUserById(id)
  
  return uniqueUser
  
}

@Patch(':id')
async updateUserById(
  @Param('id', ParseIntPipe)id:number,
  @Body() updateUserDto: UpdateUserDto
){
  const userUpdated = await this.userService.updateUserByIdService(id,updateUserDto)
  return userUpdated
}

@Delete(':id')
async deleteUserById(
  @Param('id', ParseIntPipe)id:number
){
  return this.userService.deleteUserByIdService(id)
}

}
