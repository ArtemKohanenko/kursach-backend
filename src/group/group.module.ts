import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './group.entity';
import { Course } from 'src/course/course.entity';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { UserModule } from 'src/user/user.module';
import { Teacher } from 'src/teacher/teacher.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Group, Teacher]), UserModule],
    providers: [GroupService],
    exports: [GroupService],
    controllers: [GroupController]
})
export class GroupModule {}
