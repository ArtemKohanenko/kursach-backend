import { Module } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { Teacher } from './teacher.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [TeacherController],
  imports: [TypeOrmModule.forFeature([Teacher])],
})
export class TeacherModule {}
