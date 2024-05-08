import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Student } from 'src/student/student.entity';
import { Teacher } from 'src/teacher/teacher.entity';

@Module({
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([User, Student, Teacher])],
  exports: [UserService]
})
export class UserModule {}
