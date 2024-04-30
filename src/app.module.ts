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

@Module({
  imports: [
    TypeOrmModule.forRoot({ 
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres', 
      database: 'postgres',
      entities: [Teacher, Course, Group], 
      synchronize: true,
      autoLoadEntities: true, 
    }),
    ScheduleModule.forRoot(),
    TeacherModule,
    CourseModule,
    GroupModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
