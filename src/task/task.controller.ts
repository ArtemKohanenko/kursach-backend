import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/task.dto';
import { Roles, RolesGuard } from 'src/user/role.guard';
import { Role } from 'src/user/types/roles';

@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService) {}

    @Roles(Role.student)
    @UseGuards(RolesGuard)
    @Get('student')
    async getMyStudentTasks(@Request() req) {
        const tasks = await this.taskService.getStudentTasksById(req.user.sub);
        return { data: tasks };
    }

    @Roles(Role.teacher)
    @UseGuards(RolesGuard)
    @Get('teacher')
    async getMyTeacherTasks(@Request() req) {
        const tasks = await this.taskService.getTeacherTasksById(req.user.sub);
        return { data: tasks };
    }

    
    @Roles(Role.teacher)
    @UseGuards(RolesGuard)
    @Post()
    async createTask(@Body() createTaskDto: CreateTaskDto, @Request() req) {
        const task = await this.taskService.createTaskForCourse(createTaskDto, req.user.sub);
        return { data: task }
    }
}
