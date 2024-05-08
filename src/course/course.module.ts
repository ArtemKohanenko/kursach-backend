import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './course.entity';

@Module({
  controllers: [CourseController],
  imports: [TypeOrmModule.forFeature([Course])],
})
export class CourseModule {}
