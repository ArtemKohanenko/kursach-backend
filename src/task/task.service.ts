import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { CreateTaskDto } from './dto/task.dto';
import { CourseService } from 'src/course/course.service';


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
            const task = await this.taskRepository.create({...createTaskDto });
            await this.taskRepository.save(task);

            return task;
        }        
    }
}
