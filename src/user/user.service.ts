import { UpdateUserDto } from './DTO/update-user-dto';
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

  async getUserById(id:number){
    try {
      const userForFind = await this.prisma.user.findFirst({
        where:{id:id},
        select:{
          id:true,
          userEmail:true,
          username:true,
          active:true,
          createdAt:true,
          userRoleAtributed:true,
          userPassword:true
        }
      })

      if (!userForFind) {
        throw new HttpException("Usuário não encontrado!",HttpStatus.NOT_FOUND)
      }

      return userForFind
      
    } catch (error) {
      console.log(error)
      throw new HttpException("Usuário não encontrado!",HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }

  async updateUserByIdService(id:number, updateUserDto: UpdateUserDto){
    try {
      const userForUpdate = await this.prisma.user.findUnique({
        where:{id:id}
      })

      if (!userForUpdate) {
        throw new HttpException("Usuário não encontrado!",HttpStatus.NOT_FOUND)
      }

      // if (userForFind.id != tokenPayload.id){
      //   throw new HttpException("Acesso negado.", HttpStatus.BAD_REQUEST)
      // }

      const dataUser: { username?: string, userPassword?: string } = { username: updateUserDto.username ?? userForUpdate.username }

      // if(updateUserDto.userPassword){
      //   const passwordHash = await this.hashingService.hashing(updateUserDto.userPassword)
      //   dataUser['userPassword'] = passwordHash

      // }


      const newUserUpdated = await this.prisma.user.update({
        where:{
          id: userForUpdate.id
        },
        data: {
          username: dataUser.username,
          userEmail: updateUserDto.userEmail,
          userRoleAtributed:updateUserDto.userRoleAtributed,
          userPassword: dataUser?.userPassword ?? userForUpdate.userPassword
        },
        select:{
          id: true,
          username: true,
          userEmail: true
        }
      })

      return newUserUpdated

    } catch (error) {
      console.log(error)
      throw new HttpException('Falha ao atualizar o usuário!', HttpStatus.BAD_REQUEST)
    }
    
  }

  async deleteUserByIdService(id: number){
    try {
      const userForExclude= await this.prisma.user.findFirst({
        where:{id:id}
      })

      // if (userForExclude.id !== tokenPayload.id){ 
      //   throw new HttpException("Acesso negado.", HttpStatus.BAD_REQUEST) }

      if (userForExclude?.username){
        await this.prisma.user.delete({
          where:{
            id:userForExclude.id
          }
        })

        return{
          message: "User deleted with success"
        }
      }
    } catch (error) {
      console.log(error)
      throw new HttpException('Falha ao deletar o usuário!', HttpStatus.BAD_REQUEST)
    }
  }
}
