import { Injectable } from '@nestjs/common';
import { Group } from './group.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Teacher } from 'src/teacher/teacher.entity';

@Injectable()
export class GroupService {
    constructor(
        @InjectRepository(Group)
        private groupRepository: Repository<Group>,
        @InjectRepository(Teacher)
        private teacherRepository: Repository<Teacher>,
        private userService: UserService
    )
    {}
    
    async findOneById(id: string) {
        return await this.groupRepository.findOne({
            where: {
                id: id
            }
        });
    }

    async findGroupsByTeacher(teacherUserId: string) {
        const user = await this.userService.findOneById(teacherUserId);
        const teacher = await this.teacherRepository.findOne({
            where: {
                id: user.teacher.id
            },
            relations: {
                courses: {
                    groups: true
                }
            }
        });
        
        const courses = teacher.courses;
        let groups: Group[] = [];
        courses.forEach(course => {
            course.groups.forEach(group => {
                if (!groups.map(group => group.id).includes(group.id)) {
                    groups.push(group)
                }
            })
        })
        
        return groups
    }
}
