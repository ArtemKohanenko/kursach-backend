import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Course } from 'src/course/course.entity';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { UserModule } from 'src/user/user.module';
import { CourseModule } from 'src/course/course.module';
import { Group } from 'src/group/group.entity';
import { User } from 'src/user/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Task, Course, Group, User]), UserModule, CourseModule],
    providers: [TaskService],
    exports: [TaskService],
    controllers: [TaskController]
})
export class TaskModule {}
