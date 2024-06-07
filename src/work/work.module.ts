import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Work } from './work.entity';
import { WorkController } from './work.controller';
import { WorkService } from './work.service';
import { TaskModule } from 'src/task/task.module';
import { StudentModule } from 'src/student/student.module';
import { Teacher } from 'src/teacher/teacher.entity';
import { Task } from 'src/task/task.entity';
import { TeacherModule } from 'src/teacher/teacher.module';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [TypeOrmModule.forFeature([Work, Task, Teacher]), StudentModule, TaskModule, UserModule],
    controllers: [WorkController],
    providers: [WorkService],
    exports: [WorkService]
})
export class WorkModule {}
