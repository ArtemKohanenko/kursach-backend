import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Work } from './work.entity';
import { WorkController } from './work.controller';
import { WorkService } from './work.service';
import { TaskModule } from 'src/task/task.module';
import { StudentModule } from 'src/student/student.module';

@Module({
    imports: [TypeOrmModule.forFeature([Work]), StudentModule],
    controllers: [WorkController],
    providers: [WorkService],
})
export class WorkModule {}
