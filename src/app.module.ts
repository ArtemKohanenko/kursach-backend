import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { Course } from './course/course.entity';
import { Group } from './group/group.entity';
import { CourseModule } from './course/course.module';
import { GroupModule } from './group/group.module';
import { TaskModule } from './task/task.module';
import { Task } from './task/task.entity';
import { Student } from './student/student.entity';
import { WorkModule } from './work/work.module';
import { Work } from './work/work.entity';
import { AuthModule } from './auth/auth.module';
import { Teacher } from './teacher/teacher.entity';
import { TeacherModule } from './teacher/teacher.module';
import { StudentModule } from './student/student.module';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({ 
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres', 
      database: 'postgres',
      entities: [Teacher, Course, Group, Task, Student, Work, User], 
      synchronize: true,
      autoLoadEntities: true, 
    }),
    ScheduleModule.forRoot(),
    CourseModule,
    GroupModule,
    TaskModule,
    WorkModule,
    AuthModule,
    TeacherModule,
    StudentModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
