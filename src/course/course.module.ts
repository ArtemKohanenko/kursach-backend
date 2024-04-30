import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { Teacher } from 'src/teacher/teacher.entity';
import { Group } from 'src/group/group.entity';

@Module({
  controllers: [CourseController],
  imports: [TypeOrmModule.forFeature([Course, Teacher, Group])],
})
export class CourseModule {}
