import { UserController } from './user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrismaService } from './prisma/prisma.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { TaskController } from './task/task.controller';
import { TaskService } from './task/task.service';
import { UserService } from './user/user.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    TaskController,
    UserController
  ],
  providers: [
    AppService,
    TaskService,
    UserService,
    PrismaService
  ],
})
export class AppModule {}
