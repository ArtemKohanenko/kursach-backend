import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Course } from 'src/course/course.entity';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { WorkModule } from 'src/work/work.module';
import { StudentModule } from 'src/student/student.module';
import { TeacherModule } from 'src/teacher/teacher.module';
import { UserModule } from 'src/user/user.module';
import { CourseModule } from 'src/course/course.module';

@Module({
    imports: [TypeOrmModule.forFeature([Task]), UserModule, CourseModule],
    providers: [TaskService],
    exports: [TaskService],
    controllers: [TaskController]
})
export class TaskModule {}
