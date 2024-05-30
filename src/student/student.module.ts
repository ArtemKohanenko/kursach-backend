import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from './student.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Group } from 'src/group/group.entity';
import { Work } from 'src/work/work.entity';

@Module({
  providers: [StudentService],
  imports: [TypeOrmModule.forFeature([Student, Group, Work])],
  exports: [StudentService]
})
export class StudentModule {}
