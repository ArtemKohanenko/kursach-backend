import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { CreateTaskDto, DeleteTaskDto } from './dto/task.dto';
import { CourseService } from 'src/course/course.service';
import { Role } from 'src/user/types/roles';


@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
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
        const user = await this.userService.findOneById(id);
        const courses = user.student.group.courses;
        
        let tasks = [];
        courses.forEach(course => {tasks.push(...course.tasks)})

        return tasks;
    }

    async getTeacherTasksById(id: string) {
        const user = await this.userService.findOneById(id);
        const courses = user.teacher.courses;
        
        let tasks = [];
        courses.forEach(course => {tasks.push(...course.tasks)})

        return tasks;
    }

    async createTaskForCourse(createTaskDto: CreateTaskDto, teacherUserId: string) {
        const user = await this.userService.findOneById(teacherUserId);
        const course = await this.courseService.findOneById(createTaskDto.courseId)
        const idsWithAccess = course.teachers.map(teacher => teacher.id)

        if (idsWithAccess.includes(user.teacher.id)) {
            const task = await this.taskRepository.create({...createTaskDto, course: course });
            await this.taskRepository.save(task);

            return task;
        }        
    }

    async deleteTask(taskId: string, userContext) {
        const isAdmin = userContext.roles.split(',').includes(Role.admin)
        const user = await this.userService.findOneById(userContext.sub);
        const teacherId = user.teacher.id;

        const task = await this.taskRepository.findOne({
            where: {
                id: taskId
            },
            relations: {
                course: {
                    teachers: true
                }
            }
        })

        if (isAdmin || task.course.teachers.map(teacher => teacher.id).includes(teacherId)) {
            const result = await this.taskRepository.remove(task);

            return HttpStatus.OK;
        }
        else {
            return HttpStatus.BAD_REQUEST;
        }
    }
}
