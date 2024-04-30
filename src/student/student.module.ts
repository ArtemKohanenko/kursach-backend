import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from 'src/group/group.entity';
import { Student } from './student.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Student])],
})
export class StudentModule {}
