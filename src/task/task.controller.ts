import { CreateTaskDto } from './DTO/create-task-dto';
import { GetTaskDto } from './DTO/get-task-dto';
import { UpdateTaskDTO } from './DTO/update-task-dto';
import { TaskService } from './task.service';
import { Controller, Post,Body,Get, Param, ParseIntPipe, Patch, Delete} from '@nestjs/common';

@Controller('task')
export class TaskController {
  constructor( private taskService: TaskService){}

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    //token
  ){
    console.log("oi")
    return this.taskService.createTask(createTaskDto)
  }

  @Get()
   async findAllTask() :Promise<GetTaskDto[]> {
    const tasks = await this.taskService.findAllTask();

    return tasks.map(task => ({
      id:task.id,
      title: task.title,
      description: task.description,
      priority: task.priority,
      completed: task.completed,
      createdAt: task.createdAt
    }))
    
  }

  @Get('id')
  listOneTask(@Param('id', ParseIntPipe) id:number){
    return this.taskService.findTaskById(id);
  }

  @Patch('id')
  updateTaskById(
    @Param('id',ParseIntPipe) id:number,
    @Body() updateTaskDto: UpdateTaskDTO
  ){
    return this.taskService.updateTask(id,updateTaskDto)
  }

  @Delete('id')
  deleteTaskById(
    @Param('id', ParseIntPipe) id:number,
  ){
    return this.taskService.deleteTask(id)
  }
}
