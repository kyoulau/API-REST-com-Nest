import { CreateTaskDto } from './DTO/create-task-dto';
import { TaskService } from './task.service';
import { Controller, Post,Body,Get, Param} from '@nestjs/common';

@Controller('task')
export class TaskController {
  constructor( taskService: TaskService){}

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    //token
  ){
    
  }
}
