import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './DTO/create-task-dto';
import { GetTaskDto } from './DTO/get-task-dto';
import { Task } from '@prisma/client';
import { UpdateTaskDTO } from './DTO/update-task-dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService){}

  async createTask(createTaskDto: CreateTaskDto){
    try {

      const newTask = await this.prisma.task.create({
        data:{
          title:createTaskDto.title,
          description:createTaskDto.description,
          priority: createTaskDto.priority,
          completed: false,
        }
      })
      return newTask
    } catch (error) {
      console.log(error)
      throw new HttpException("Falha ao cadastrar tarefa", HttpStatus.BAD_REQUEST)
    }
  }

  async findAllTask(): Promise<GetTaskDto[]>{
    try {
      const tasks: Task[] = await this.prisma.task.findMany();
      return tasks
    } catch (error) {
      console.log(error)
      throw new HttpException("Falha ao retornar todas as tarefas", HttpStatus.BAD_REQUEST)
    }
  }

  async findTaskById(id: number){
    try {

      const taskForFindById = await this.prisma.task.findUnique({
        where:{
          id:id
        }
      })

      if(!taskForFindById){
        throw new HttpException("A tarefa com esse ID não existe!",HttpStatus.NOT_FOUND)
      }

      return taskForFindById
      
    } catch (error) {
      console.log(error)
      throw new HttpException("Falha ao encontrar tarefa",HttpStatus.BAD_REQUEST)
      
    }
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDTO){
    try {
      //encontra tarefa

      const taskForUpdate = await this.prisma.task.findUnique({
        where:{
          id:id
        }
      })

      if(!taskForUpdate){
        throw new HttpException("Essa tarefa não existe!", HttpStatus.NOT_FOUND)
      }

      //if tokenPayload

      const newTask = await this.prisma.task.update({
        where:{
          id: taskForUpdate.id
        },
        data: updateTaskDto
      })

      return newTask

    } catch (error) {
      console.log(error)
      throw new HttpException("Falha ao atualizar tarefa",HttpStatus.BAD_REQUEST)
    }
  }

  async deleteTask(id: number){
    try {
      const taskForDelete = await this.prisma.task.findUnique({
        where:{
          id:id
        }
      })

      //if tokenPayload

      if(!taskForDelete){
        throw new HttpException("Essa tarefa não existe!", HttpStatus.NOT_FOUND)
      }
    } catch (error) {
      console.log(error)
      throw new HttpException("Falha ao deletar tarefa",HttpStatus.BAD_REQUEST)
      
    }
  }
}
