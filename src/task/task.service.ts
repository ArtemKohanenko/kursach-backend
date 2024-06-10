import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { CreateTaskDto } from './dto/task.dto';
import { CourseService } from 'src/course/course.service';
import { Course } from 'src/course/course.entity';
import { Group } from 'src/group/group.entity';
import { User } from 'src/user/user.entity';


@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
        @InjectRepository(Course)
        private courseRepository: Repository<Course>,
        @InjectRepository(Group)
        private groupRepository: Repository<Group>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private courseService: CourseService,
        private userService: UserService
    )
    {}

    async findOneById(id: string): Promise<Task | undefined> {
        return await this.taskRepository.findOne({
            where: {
                id: id
            }
        });
    }

    async getStudentTasksById(id: string) {
        const user = await this.userRepository.findOne({
            where: {
                id: id
            },
            relations: {
                student: {
                    group: {
                        courses: {
                            tasks: true
                        }
                    }
                }
            }
        });
        const courses = user.student.group.courses;
        
        let tasks = [];
        courses.forEach(course => {tasks.push(...course.tasks)})

        return tasks;
    }

    async getTeacherTasksById(userId: string) {
        const user = await this.userRepository.findOne({
            where: {
                id: userId
            },
            relations: {
                teacher: {
                    courses: {
                        tasks: true
                    }
                }
            }
        });
        const courses = user.teacher.courses;
        
        let tasks = [];
        courses.forEach(course => {tasks.push(...course.tasks)})

        return tasks;
    }

    async createTaskForCourse(createTaskDto: CreateTaskDto, teacherUserId: string) {
        const user = await this.userService.findOneById(teacherUserId);
        const course = await this.courseRepository.findOne({
            where: {
                id: createTaskDto.courseId
            },
            relations: {
                teachers: true
            }
        })
        const idsWithAccess = course.teachers.map(teacher => teacher.id)
        
        if (idsWithAccess.includes(user.teacher.id)) {
            const task = await this.taskRepository.create({...createTaskDto });
            const taskRes = await this.taskRepository.save(task);

            return taskRes;
        }        
    }
}
