import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { CourseService } from './course.service';
import { UserModule } from 'src/user/user.module';
import { TeacherModule } from 'src/teacher/teacher.module';
import { GroupModule } from 'src/group/group.module';
import { Task } from 'src/task/task.entity';
import { Teacher } from 'src/teacher/teacher.entity';
import { StudentModule } from 'src/student/student.module';
import { Group } from 'src/group/group.entity';

@Module({
  controllers: [CourseController],
  imports: [TypeOrmModule.forFeature([Course, Task, Teacher, Group]), UserModule, TeacherModule, GroupModule, StudentModule],
  providers: [CourseService],
  exports: [CourseService]
})
export class CourseModule {}
