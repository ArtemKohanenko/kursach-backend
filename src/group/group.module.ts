import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './group.entity';
import { Course } from 'src/course/course.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Group])],
})
export class GroupModule {}
