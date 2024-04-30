import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { Teacher } from './teacher/teacher.entity';
import { Course } from './course/course.entity';
import { Group } from './group/group.entity';
import { CourseModule } from './course/course.module';
import { TeacherModule } from './teacher/teacher.module';
import { GroupModule } from './group/group.module';
import { TaskModule } from './task/task.module';
import { Task } from './task/task.entity';
import { StudentModule } from './student/student.module';
import { Student } from './student/student.entity';
import { WorkModule } from './work/work.module';
import { Work } from './work/work.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({ 
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres', 
      database: 'postgres',
      entities: [Teacher, Course, Group, Task, Student, Work], 
      synchronize: true,
      autoLoadEntities: true, 
    }),
    ScheduleModule.forRoot(),
    TeacherModule,
    CourseModule,
    GroupModule,
    TaskModule,
    StudentModule,
    WorkModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
