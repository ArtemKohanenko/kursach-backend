import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Work } from 'src/work/work.entity';
import { Teacher } from './teacher.entity';
import { Course } from 'src/course/course.entity';
import { User } from 'src/user/user.entity';

@Module({
  providers: [TeacherService],
  imports: [TypeOrmModule.forFeature([Teacher, Course])],
  exports: [TeacherService]
})
export class TeacherModule {}
